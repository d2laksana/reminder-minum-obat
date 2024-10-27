<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\ForgetPassword;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use App\Mail\ForgetPassword as ForgetPasswordMail;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class ForgetPasswordController extends Controller
{
  public function index()
  {
    return Inertia::render('Auth/ForgetPassword', [
			'title' => 'Forget Password',
		]);
  }

	public function store(Request $request)
	{
		$request->validate([
			'email' => 'required|email',
		]);

		$user = User::where('email', $request->email)->first();
		if (!$user) {
			return redirect()->back()->withErrors([
				'email' => 'Your email is not registered',
			]);
		}

		$token = Str::uuid();
		ForgetPassword::create([
			'email' => $request->email,
			'token' => $token,
			'expired_at' => now()->addHour(),
		]);

		Mail::to($user)->send(new ForgetPasswordMail($user, $token));
		return redirect()->route('forget.password');
	}

	public function reset($token)
	{
		return Inertia::render('Auth/ResetPassword', [
			'title' => 'Reset Password',
			'token' => $token,
		]);	
	}

	public function reset_store(Request $request)
	{
		$request->validate([
			'password' => 'required|string|min:8',
			'password_confirmation' => 'required|same:password',
			'token' => 'required|string',
		]);

		$forget = ForgetPassword::where('token', $request->token)->where('expired_at', '>', now())->whereNull('used_at')->first();
		if (!$forget) {
			return redirect()->route('forget.password')->withErrors([
				'password' => 'Your token is invalid or expired',
			]);
		}

		$user = User::where('email', $forget->email)->first();
		$user->password = Hash::make($request->password);
		$user->save();

		$forget->used_at = now();
		$forget->save();

		return redirect()->route('login');
	}
}