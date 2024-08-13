<?php

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/products', [ApiController::class, 'getProducts']);
Route::get('/products/{imagePath}', [ApiController::class, 'getProductByImagePath']);

