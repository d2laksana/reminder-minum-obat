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


    if (Auth::attempt($request->only('email', 'password'), $request->remember)) {
      if (!Auth::user()->email_verified_at) {
        Auth::logout();
        return redirect()->back()->withErrors([
          'email' => 'Your email is not verified',
        ]);
      }

      $request->session()->regenerate();
      // check if user role is pasien then redirect to pasien.jadwal route else redirect to home route
      return redirect()->route(Auth::user()->role === 'pasien' ? 'pasien.jadwal' : 'home');
    }

    return redirect()->back()->withErrors([
      'password' => 'Invalid credentials',
    ]);
  }

  public function logout(Request $request)
  {
    Auth::logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();
    return redirect()->route('login');
  }
}
