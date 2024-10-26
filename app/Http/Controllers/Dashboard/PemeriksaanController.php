<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Nakes;
use App\Models\Prescription_details;
use App\Models\Prescriptions;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PemeriksaanController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/Pemeriksaan/Index', [
            'title' => 'Pemeriksaan',
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
                $nakes = Nakes::where('user_id', 1)->firstOrFail();

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
}
