<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\EmailVerification;

class EmailVerificationController extends Controller
{
  public function index()
  {
    return Inertia::render('Auth/EmailVerification', [
			'title' => 'Email Verification',
		]);
  }

	public function verify(Request $request)
	{
		$request->validate([
			'pin' => 'required|string',
		]);

		$verification = EmailVerification::where('pin', $request->pin)->where('expired_at', '>', now())->whereNull('used_at')->first();
		if (!$verification) {
			return redirect()->back()->withErrors([
				'pin' => 'Your pin is invalid or expired',
			]);
		}

		$user = User::where('email', $verification->email)->first();
		$user->email_verified_at = now();

		$verification->used_at = now();
		$verification->save();

		$user->save();

		return redirect()->route('login');
	}
}