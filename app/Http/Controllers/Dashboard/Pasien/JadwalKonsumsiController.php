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

		return Inertia::render('Dashboard/UnggahBukti/Index', [
			'title' => 'Pemeriksaan',
			'prescriptions' => $prescriptions,
		]);
	}
}
