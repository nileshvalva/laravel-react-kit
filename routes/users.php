<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::redirect('users', 'users/index');

    Route::get('users/index', [UserController::class, 'index'])->name('user.index');
    Route::get('users/create', [UserController::class, 'create'])->name('user.create');
    Route::post('users/store', [UserController::class, 'store'])->name('user.store');
    Route::get('users/{id}/edit', [UserController::class, 'edit'])->name('user.edit');
    Route::post('users/{id}/update', [UserController::class, 'update'])->name('user.update');
    Route::delete('users/{id}/delete', [UserController::class, 'destroy'])->name('user.destroy');
});
