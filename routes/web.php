<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Dashboard\OverviewController;
use App\Http\Controllers\Dashboard\PemeriksaanController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [OverviewController::class, 'index'])->name('home');

// route prefix /auth
Route::prefix('auth')->group(function () {
    Route::get('/login', [LoginController::class, 'index'])->name('login');
});

Route::prefix('pemeriksaan')->group(function () {
    Route::get('/', [PemeriksaanController::class, 'index'])->name('pemeriksaan');
    Route::get('/create', [PemeriksaanController::class, 'create'])->name('pemeriksaan.create');
    Route::post('/', [PemeriksaanController::class, 'store'])->name('pemeriksaan.store');
});
