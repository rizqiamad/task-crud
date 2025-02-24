<?php

use App\Http\Controllers\LoginUser;
use App\Http\Controllers\LogoutUser;
use App\Http\Controllers\RegisterUser;
use App\Http\Controllers\TaskController;
use App\Http\Middleware\JwtMiddleware;
use Illuminate\Support\Facades\Route;

Route::post('/register', RegisterUser::class);
Route::post('/login', LoginUser::class);


Route::middleware(JwtMiddleware::class)->group(function () {
    Route::post('/logout', LogoutUser::class);

    Route::get('/tasks', [TaskController::class, 'getTasks']);

    Route::post('/tasks', [TaskController::class, 'createTask']);

    Route::delete('/tasks/{id}', [TaskController::class, 'deleteTask']);

    Route::patch('/tasks/{id}', [TaskController::class, 'editTask']);
});
