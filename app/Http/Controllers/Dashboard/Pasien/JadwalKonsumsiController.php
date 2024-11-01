<?php

namespace App\Http\Controllers\Dashboard\Pasien;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Prescriptions;
use Illuminate\Support\Facades\Auth;

class JadwalKonsumsiController extends Controller
{
  public function index()
  {
		$prescriptions = Prescriptions::with('details')
			->where('pasien_id', Auth::user()->id)
			->latest()
			->first();

		$details = $prescriptions ? $prescriptions->details : [];
		foreach ($details as $detail) {
			$detail->is_sembuh = $detail->laporan->where('status', 'sembuh')->first() ? true : false;
		}

		return Inertia::render('Dashboard/Jadwal/Index', [
			'title' => 'Pemeriksaan',
			'prescriptions' => $prescriptions,
		]);
	}
}
