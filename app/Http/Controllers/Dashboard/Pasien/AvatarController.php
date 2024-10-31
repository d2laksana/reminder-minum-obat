<?php

namespace App\Http\Controllers\Dashboard\Pasien;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Prescriptions;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AvatarController extends Controller
{
  public function index()
  {
		return Inertia::render('Avatar/Index', [
			'title' => 'Avatar',
		]);
	}

	public function store(Request $request)
	{
		$request->validate([
			'avatar' => 'required',
		]);

		$user = User::find(Auth::user()->id);
		$user->avatar = $request->avatar;
		$user->save();

		// redirect to route pasien.jadwal
		return redirect()->route('pasien.jadwal');
	}
}
