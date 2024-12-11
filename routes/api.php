<?php

use App\Http\Controllers\TodoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Rute untuk mengambil daftar todos
Route::get('/todos', [TodoController::class, 'index']);

// Rute untuk menambahkan todo baru
Route::post('/todos', [TodoController::class, 'store']);

// Rute untuk memperbarui todo
Route::put('/todos/{todo}', [TodoController::class, 'update']);

// Rute untuk menghapus todo
Route::delete('/todos/{todo}', [TodoController::class, 'destroy']);

// Rute untuk mengubah status "completed" pada todo
Route::post('/todos/{todo}/toggle', [TodoController::class, 'toggleComplete']);

Route::get('/todos/statistics', [TodoController::class, 'getStatistics']);

