<?php

use App\Http\Controllers\ApiController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\CategoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/products', [ApiController::class, 'getProducts']);
Route::get('/products/{imagePath}', [ApiController::class, 'getProductByImagePath']);

Route::get('/categories', [CategoryController::class, 'index']);

Route::post('/login', [ApiController::class, 'login']);
Route::middleware('auth:sanctum')->get('/user', [ApiController::class, 'getUser']);
