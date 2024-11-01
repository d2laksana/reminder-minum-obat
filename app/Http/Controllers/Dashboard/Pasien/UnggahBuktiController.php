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
use App\Models\CoinsLog;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class UnggahBuktiController extends Controller
{
  public function index()
	{
		$prescriptions = Prescriptions::with('details')
			->where('pasien_id', Auth::user()->id)
			->latest()
			->first();

		// Check if a prescription was found
		if ($prescriptions) {
			$totalProgress = 0;
			$detailCount = $prescriptions->details->count();

			foreach ($prescriptions->details as $detail) {
					$reported_konsumsi = Laporan::where('prescription_detail_id', $detail->id)
						->count();

					$laporan = Laporan::where('prescription_detail_id', $detail->id)
						->whereIn('id', function ($query) {
							$query->select(DB::raw('MAX(id)')) // Get latest ID for each prescription detail
									->from('laporans')
									->groupBy('prescription_detail_id');
						})->get();

					if ($laporan->isNotEmpty() && $laporan[0]->status == 'sembuh') {
						$detail->progress = $detail->total_konsumsi > 0
							? ($detail->total_konsumsi / $detail->total_konsumsi) * 100
							: 0;

						$totalProgress += $detail->progress;
					} else {
						$detail->progress = $detail->total_konsumsi > 0
							? ($reported_konsumsi / $detail->total_konsumsi) * 100
							: 0;

						$totalProgress += $detail->progress;
					}

					$days_to_empty = $detail->total_konsumsi / $detail->aturan_konsumsi;
					$detail->days_to_empty = ceil($days_to_empty);
					$detail->empty_date = $detail->created_at->addDays($detail->days_to_empty)->format('d/m/Y');
			}

			$prescriptions->progress = $detailCount > 0 ? $totalProgress / $detailCount : 0;
		}

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

		// Add coins to user
		$user = User::find(Auth::id());
		$user->coins += 30;
		$user->save();

		// Store to coins log
		CoinsLog::create([
			'user_id' => Auth::id(),
			'coins' => 30,
			'title' => 'Mengonsumsi obat',
		]);

		// Store to database
		Laporan::create([
			'prescription_detail_id' => $request->prescription_detail_id,
			'status' => $request->status == 'true' ? 'sembuh' : 'sakit',
			'photo' => url('storage/bukti/' . $photoName),
			'description' => $request->description,
		]);

		return redirect()->route('pasien.bukti');
	}
}
