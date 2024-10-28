<?php

namespace App\Http\Controllers\Dashboard\Pasien;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Prescriptions;
use Illuminate\Support\Facades\Auth;
use App\Models\Laporan;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class UnggahBuktiController extends Controller
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

	public function store(Request $request)
	{
		$request->validate([
			'prescription_detail_id' => 'required|exists:prescription_details,id',
			'status' => 'nullable',
			'photo' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
			'description' => 'nullable',
		]);

		// Store photo
		$photo = $request->file('photo');
		$photoName = Str::random(20) . '.' . $photo->extension();
		$photo->storeAs('bukti', $photoName, 'public');

		// Store to database
		Laporan::create([
			'prescription_detail_id' => $request->prescription_detail_id,
			'status' => $request->status == 'true ' ? 'sembuh' : 'sakit',
			'photo' => url('storage/bukti/' . $photoName),
			'description' => $request->description,
		]);

		return redirect()->route('pasien.bukti');
	}
}
