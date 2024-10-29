<?php

namespace App\Http\Controllers\Dashboard\Pasien;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Prescriptions;
use Illuminate\Support\Facades\Auth;
use App\Models\CoinsLog;

class PencapaianController extends Controller
{
  public function index()
  {
		$logs = CoinsLog::where('user_id', Auth::user()->id)
			->latest()
			->get();
			
		return Inertia::render('Dashboard/Pencapaian/Index', [
			'title' => 'Pencapaian',
			'logs' => $logs,
		]);
	}
}
