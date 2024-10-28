<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\EmailVerificationController;
use App\Http\Controllers\Auth\ForgetPasswordController;
use App\Http\Controllers\Dashboard\OverviewController;
use App\Http\Controllers\Dashboard\PemeriksaanController;
use App\Http\Middleware\AuthMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


// route prefix /auth
Route::prefix('auth')->group(function () {
    Route::get('/login', [LoginController::class, 'index'])->name('login');
    Route::post('/login', [LoginController::class, 'login'])->name('login.post');
    Route::get('/logout', [LoginController::class, 'logout'])->name('logout')->middleware(AuthMiddleware::class);

    Route::get('/register', [RegisterController::class, 'index'])->name('register');
    Route::get('/register/pasien', [RegisterController::class, 'RegisterPasien'])->name('register.pasien');
    Route::post('/register/pasien', [RegisterController::class, 'RegisterPasienPost'])->name('register.pasien.post');

    Route::get('/register/nakes', [RegisterController::class, 'RegisterNakes'])->name('register.nakes');
    Route::post('/register/nakes', [RegisterController::class, 'RegisterNakesPost'])->name('register.nakes.post');

    Route::get('/verify/email', [EmailVerificationController::class, 'index'])->name('verify.email');
    Route::post('/verify/email', [EmailVerificationController::class, 'verify'])->name('verify.email.post');

    Route::get('/forget', [ForgetPasswordController::class, 'index'])->name('forget.password');
    Route::post('/forget', [ForgetPasswordController::class, 'store'])->name('forget.password.post');

    Route::get('/reset/{token}', [ForgetPasswordController::class, 'reset'])->name('reset.password');
    Route::post('/reset', [ForgetPasswordController::class, 'reset_store'])->name('reset.password.post');
});


Route::middleware(AuthMiddleware::class)->group(function () {
    Route::get('/', [OverviewController::class, 'index'])->name('home');

    Route::prefix('pemeriksaan')->group(function () {
        Route::get('/', [PemeriksaanController::class, 'index'])->name('pemeriksaan');
        Route::get('/create', [PemeriksaanController::class, 'create'])->name('pemeriksaan.create');
        Route::post('/', [PemeriksaanController::class, 'store'])->name('pemeriksaan.store');
        Route::get('/{id}', [PemeriksaanController::class, 'show'])->name('pemeriksaan.show');
        Route::get('/{id}/edit', [PemeriksaanController::class, 'edit'])->name('pemeriksaan.edit');
        Route::put('/{id}', [PemeriksaanController::class, 'update'])->name('pemeriksaan.update');
    });
});
