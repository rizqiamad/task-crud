<?php

use App\Http\Middleware\Authenticate;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(Authenticate::class)->group(function () {
    Route::get('/', function () {
        return Inertia::render('Home');
    })->name('home');
});

Route::middleware('guest')->group(function () {
    Route::get('/register', function () {
        return Inertia::render('Register');
    })->name('register');

    Route::get('/login', function () {
        return Inertia::render('Login');
    })->name('login');
});
