<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Models\Nakes;
use App\Models\Instansi;
use App\Models\EmailVerification;
use App\Mail\EmailVerification as MailEmailVerification;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class RegisterController extends Controller
{
	public function index()
	{
		return Inertia::render('Auth/Register', [
			'title' => 'Register',
		]);
	}

	public function RegisterPasien()
	{
		return Inertia::render('Auth/RegisterPasien', [
			'title' => 'Register Pasien',
		]);
	}

	public function RegisterPasienPost(Request $request)
	{
		try {
			DB::transaction(function () use ($request) {
				$request->validate([
					'name' => 'required|string|max:255',
					'username' => 'required|string|max:255|unique:users',
					'email' => 'required|string|email|max:255|unique:users',
					'bpjs_number' => 'required|string|max:255|unique:users',
					'password' => 'required|string|min:8',
					'password_confirmation' => 'required|string|min:8|same:password',
					'address' => 'required|string|max:255',
					'phone' => 'required|string|max:255',
					'birth_date' => 'required|date',
					'gender' => 'required|string|max:255|in:Pria,Wanita',
				]);

				$user = User::create([
					'name' => $request->name,
					'username' => $request->username,
					'email' => $request->email,
					'bpjs_number' => $request->bpjs_number,
					'password' => Hash::make($request->password),
					'address' => $request->address,
					'phone' => $request->phone,
					'birth_date' => $request->birth_date,
					'gender' => $request->gender,
					'password' => Hash::make($request->password),
				]);

				$pin = rand(100000, 999999);

				EmailVerification::create([
					'email' => $request->email,
					'pin' => $pin,
					'expired_at' => now()->addMinutes(60),
				]);

				Mail::to($request->email)->send(new MailEmailVerification($user, $pin));
			});
			return redirect()->route('verify.email');
		} catch (\Throwable $th) {
			return back()->withErrors(['message' => $th->getMessage()])->withInput();
		}
	}

	public function RegisterNakes()
	{
		return Inertia::render('Auth/RegisterNakes', [
			'title' => 'Register Nakes',
			'instansis' => Instansi::all(),
		]);
	}

	public function RegisterNakesPost(Request $request)
	{
		try {
			DB::transaction(function () use ($request) {
				$request->validate([
					'instansi_id' => 'required|exists:instansis,id',
					'name' => 'required|string|max:255',
					'username' => 'required|string|max:255|unique:users',
					'email' => 'required|string|email|max:255|unique:users',
					'bpjs_number' => 'required|string|max:255|unique:users',
					'password' => 'required|string|min:8',
					'password_confirmation' => 'required|string|min:8|same:password',
					'address' => 'required|string|max:255',
					'phone' => 'required|string|max:255',
					'birth_date' => 'required|date',
					'gender' => 'required|string|max:255|in:Pria,Wanita',
				]);

				$user = User::create([
					'name' => $request->name,
					'username' => $request->username,
					'email' => $request->email,
					'bpjs_number' => $request->bpjs_number,
					'password' => Hash::make($request->password),
					'address' => $request->address,
					'phone' => $request->phone,
					'birth_date' => $request->birth_date,
					'gender' => $request->gender,
					'password' => Hash::make($request->password),
					'role' => 'nakes',
				]);

				Nakes::create([
					'user_id' => $user->id,
					'instansi_id' => $request->instansi_id,
				]);

				$pin = rand(100000, 999999);

				EmailVerification::create([
					'email' => $request->email,
					'pin' => $pin,
					'expired_at' => now()->addMinutes(60),
				]);

				Mail::to($request->email)->send(new MailEmailVerification($user, $pin));
			});
			return redirect()->route('verify.email');
		} catch (\Throwable $th) {
			return back()->withErrors(['message' => $th->getMessage()])->withInput();
		}
	}
}
