<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
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
            ->with('pasien', 'nakes.user')
            ->when($request->search, function ($query, $search) {
                $query->whereHas('pasien', function ($q) use ($search) {
                    $q->where('name', 'like', '%' . $search . '%');
                });
            })
            ->paginate(10)
            ->appends($request->query());

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
        $prescription = Prescriptions::with('pasien', 'nakes.user', 'details')->findOrFail($id);
        // dd($prescription);

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
            });
            return redirect()->route('pemeriksaan')->with('success', 'Berhasil mengubah data pemeriksaan');
        } catch (\Throwable $th) {
            return back()->withErrors(['message' => $th->getMessage()])->withInput();
        }
    }
}
