<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;

class LoginController extends Controller
{
  public function index()
  {
    return Inertia::render('Auth/Login', [
			'title' => 'Login',
		]);
  }
}