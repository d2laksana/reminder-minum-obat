<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\EmailVerificationController;
use App\Http\Controllers\Dashboard\OverviewController;
use App\Http\Controllers\Dashboard\PemeriksaanController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [OverviewController::class, 'index'])->name('home');

// route prefix /auth
Route::prefix('auth')->group(function () {
    Route::get('/login', [LoginController::class, 'index'])->name('login');
    Route::post('/login', [LoginController::class, 'login'])->name('login.post');

    Route::get('/register', [RegisterController::class, 'index'])->name('register');
    Route::get('/register/pasien', [RegisterController::class, 'RegisterPasien'])->name('register.pasien');
    Route::post('/register/pasien', [RegisterController::class, 'RegisterPasienPost'])->name('register.pasien.post');

    Route::get('/register/nakes', [RegisterController::class, 'RegisterNakes'])->name('register.nakes');
    Route::post('/register/nakes', [RegisterController::class, 'RegisterNakesPost'])->name('register.nakes.post');

    Route::get('/verify/email', [EmailVerificationController::class, 'index'])->name('verify.email');
    Route::post('/verify/email', [EmailVerificationController::class, 'verify'])->name('verify.email.post');
});

Route::prefix('pemeriksaan')->group(function () {
    Route::get('/', [PemeriksaanController::class, 'index'])->name('pemeriksaan');
    Route::get('/create', [PemeriksaanController::class, 'create'])->name('pemeriksaan.create');
    Route::post('/', [PemeriksaanController::class, 'store'])->name('pemeriksaan.store');
    Route::get('/{id}', [PemeriksaanController::class, 'edit'])->name('pemeriksaan.edit');
});
