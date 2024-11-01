<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Laporan;
use App\Models\Nakes;
use App\Models\Prescription_details;
use App\Models\Prescriptions;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PemeriksaanController extends Controller
{
    public function index(Request $request)
    {
        $prescriptions = Prescriptions::query()
            ->with('pasien:id,name', 'nakes.user:id', 'details:id,prescription_id,created_at,aturan_konsumsi,total_konsumsi')
            ->when($request->search, function ($query, $search) {
                $query->whereHas('pasien', function ($q) use ($search) {
                    $q->where('name', 'like', '%' . $search . '%');
                });
            })
            ->whereHas('nakes', function ($query) {
                $query->where('user_id', Auth::user()->id);
            })
            ->paginate(10)
            ->appends($request->query());

        foreach ($prescriptions as $prescription) {
            $totalProgress = 0;
            $detailCount = $prescription->details->count();

            foreach ($prescription->details as $detail) {
                $reported_konsumsi = Laporan::where('prescription_detail_id', $detail->id)
                    ->count();

                $laporan = Laporan::where('prescription_detail_id', $detail->id)
                    ->whereIn('id', function ($query) {
                        $query->select(DB::raw('MAX(id)')) // Ambil ID terbesar (terbaru) untuk setiap pasien
                            ->from('laporans')
                            ->groupBy('prescription_detail_id');
                    })->get();
                // dd($laporan[]);
                if ($laporan && $laporan[0]->status === 'sembuh') {
                    $detail->progress = $detail->total_konsumsi > 0
                        ? ($detail->total_konsumsi / $detail->total_konsumsi) * 100
                        : 0;

                    $totalProgress += $detail->progress;
                } else {
                    $detail->progress = $detail->total_konsumsi > 0
                        ? ($reported_konsumsi / $detail->total_konsumsi) * 100
                        : 0;

                    $totalProgress += $detail->progress;
                    $users[] = $prescription->pasien_id;
                }


                $days_to_empty = $detail->total_konsumsi / $detail->aturan_konsumsi;
                $detail->days_to_empty = ceil($days_to_empty);
                $detail->empty_date = $detail->created_at->addDays($detail->days_to_empty)->format('d/m/Y');
            }
            $prescription->progress = $detailCount > 0 ? $totalProgress / $detailCount : 0;
        }
        return Inertia::render('Dashboard/Pemeriksaan/Index', [
            'title' => 'Pemeriksaan',
            'prescriptions' => $prescriptions,
            'filters' => $request->only('search'),
        ]);
    }

    public function create()
    {
        return Inertia::render('Dashboard/Pemeriksaan/Create', [
            'title' => 'Tambah Pemeriksaan'
        ]);
    }

    public function store(Request $request)
    {
        try {
            DB::transaction(function () use ($request) {
                $data = $request->validate([
                    'bpjs_number' => 'required|exists:users,bpjs_number',
                    'diagnosis' => 'required'
                ]);

                $pasien = User::where('bpjs_number', $request->bpjs_number)->firstOrFail();
                $nakes = Nakes::where('user_id', Auth::user()->id)->firstOrFail();

                $prescription = Prescriptions::create([
                    'pasien_id' => $pasien->id,
                    'nakes_id' => $nakes->id,
                    'diagnosis' => $request->diagnosis
                ]);

                foreach ($request->resep as $item) {
                    Prescription_details::create([
                        'prescription_id' => $prescription->id,
                        'medicine' => $item['medicine'],
                        'quantity' => $item['quantity'],
                        'dosage' => $item['dosage'],
                        'aturan_konsumsi' => $item['aturan_konsumsi'],
                        'total_konsumsi' => $item['total_konsumsi'],
                        'instructions' => $item['instructions'],
                        'status' => $item['status'],
                        'time_before_after_meal' => $item['time_before_after_meal']
                    ]);
                }
            });

            return redirect()->route('pemeriksaan')->with('success', 'Berhasil menambahkan data pemeriksaan');
        } catch (\Throwable $th) {
            return back()->withErrors(['message' => $th->getMessage()])->withInput();
        }
    }

    public function show($id)
    {
        $prescription = Prescriptions::with('pasien:id,name,role,birth_date,gender,address', 'details')->findOrFail($id);
        foreach ($prescription->details as $detail) {
            $days_to_empty = $detail->total_konsumsi / $detail->aturan_konsumsi;
            $detail->days_to_empty = ceil($days_to_empty);
            $detail->empty_date = $detail->created_at->addDays($detail->days_to_empty)->format('d/m/Y');
        }

        return Inertia::render('Dashboard/Pemeriksaan/Show', [
            'title' => 'Detail Pemeriksaan',
            'prescription' => $prescription
        ]);
    }

    public function edit($id)
    {
        $prescription = Prescriptions::with('pasien', 'nakes.user', 'details')->findOrFail($id);
        // dd($prescription);

        return Inertia::render('Dashboard/Pemeriksaan/Edit', [
            'title' => 'Edit Pemeriksaan',
            'prescription' => $prescription
        ]);
    }

    public function update(Request $request, $id)
    {
        try {
            DB::transaction(function () use ($request, $id) {
                $data = $request->validate([
                    'bpjs_number' => 'required|exists:users,bpjs_number',
                    'diagnosis' => 'required'
                ]);

                $pasien = User::where('bpjs_number', $request->bpjs_number)->firstOrFail();
                $nakes = Nakes::where('user_id', Auth::user()->id)->firstOrFail();

                $prescription = Prescriptions::with('details')->findOrFail($id);
                $prescription->update([
                    'pasien_id' => $pasien->id,
                    'nakes_id' => $nakes->id,
                    'diagnosis' => $request->diagnosis
                ]);

                foreach ($request->resep as $item) {
                    if (isset($item['id'])) {
                        $detail = Prescription_details::findOrFail($item['id']);
                        $detail->update([
                            'medicine' => $item['medicine'],
                            'quantity' => $item['quantity'],
                            'dosage' => $item['dosage'],
                            'aturan_konsumsi' => $item['aturan_konsumsi'],
                            'total_konsumsi' => $item['total_konsumsi'],
                            'instructions' => $item['instructions'],
                            'status' => $item['status'],
                            'time_before_after_meal' => $item['time_before_after_meal']
                        ]);
                    } else {
                        Prescription_details::create([
                            'prescription_id' => $prescription->id,
                            'medicine' => $item['medicine'],
                            'quantity' => $item['quantity'],
                            'dosage' => $item['dosage'],
                            'aturan_konsumsi' => $item['aturan_konsumsi'],
                            'total_konsumsi' => $item['total_konsumsi'],
                            'instructions' => $item['instructions'],
                            'status' => $item['status'],
                            'time_before_after_meal' => $item['time_before_after_meal']
                        ]);
                    }
                }

                if ($request->has('deleteResep')) {
                    foreach ($request->deleteResep as $item) {
                        Prescription_details::findOrFail($item)->delete();
                    }
                }
            });
            return redirect()->route('pemeriksaan')->with('success', 'Berhasil mengubah data pemeriksaan');
        } catch (\Throwable $th) {
            return back()->withErrors(['message' => $th->getMessage()])->withInput();
        }
    }

    public function destroy($id)
    {
        try {
            DB::transaction(function () use ($id) {
                $prescription = Prescriptions::findOrFail($id);
                $prescription->delete();
            });
            return redirect()->route('pemeriksaan')->with('success', 'Berhasil menghapus data pemeriksaan');
        } catch (\Throwable $th) {
            return back()->withErrors(['message' => $th->getMessage()]);
        }
    }
}
