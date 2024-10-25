<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Dashboard\OverviewController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [OverviewController::class, 'index'])->name('home');

// route prefix /auth
Route::prefix('auth')->group(function () {
    Route::get('/login', [LoginController::class, 'index'])->name('login');
});
