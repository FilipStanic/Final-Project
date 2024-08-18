<?php

use App\Http\Controllers\ApiController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/products', [ApiController::class, 'getProducts']);
Route::get('/products/{imagePath}', [ApiController::class, 'getProductByImagePath']);
Route::post('/products', [ProductController::class, 'store']);

Route::get('/categories', [CategoryController::class, 'index']);

Route::post('/login', [ApiController::class, 'login']);
Route::post('/register', [ApiController::class, 'register']);
Route::middleware('auth:sanctum')->get('/user', [ApiController::class, 'getUser']);
Route::middleware('auth:sanctum')->delete('/user/{id}', [ApiController::class, 'deleteUser']);
Route::middleware('auth:sanctum')->get('/user/products', [ApiController::class, 'getUserProducts']);
Route::middleware('auth:sanctum')->post('/products', [ProductController::class, 'store']);




