<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
  public function index()
  {
    return Inertia::render('Auth/Login', [
			'title' => 'Login',
		]);
  }

  public function login(Request $request)
  {
    $request->validate([
      'email' => 'required|string|exists:users,email',
      'password' => 'required|string',
      'remember' => 'nullable|boolean',
    ]);

    if (!Auth::attempt($request->only('email', 'password'))) {
      return redirect()->back()->withErrors([
        'password' => 'Invalid credentials',
      ]);
    }

    // check if user is not verified
    if (!Auth::user()->email_verified_at) {
      Auth::logout();
      return redirect()->back()->withErrors([
        'email' => 'Your email is not verified',
      ]);
    }

    //
    // Lanjutke ning kene nu
    //

    return redirect()->route('home');
  }
}