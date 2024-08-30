<?php

use App\Http\Controllers\ApiController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TagController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Support\Facades\Route;

Route::get('/products', [ApiController::class, 'getProducts']);
Route::get('/products/image/{imagePath}', [ApiController::class, 'getProductByImagePath']);


Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{category}/tags', [TagController::class, 'tagsByCategory']);
Route::get('/tags', [TagController::class, 'index']);

Route::post('/login', [ApiController::class, 'login']);
Route::post('/register', [ApiController::class, 'register']);

Route::get('email/verify/{id}/{hash}', [ApiController::class, 'verifyEmail'])->name('api.verification.verify')->middleware('signed');



Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [ApiController::class, 'getUser']);
    Route::delete('/user/{id}', [ApiController::class, 'deleteUser']);
    Route::get('/user/products', [ApiController::class, 'getUserProducts']);
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/cart', [CartController::class, 'getCart']);
    Route::post('/cart/update', [CartController::class, 'updateCart']);
    Route::post('/cart/checkout', [CartController::class, 'checkout']);
    Route::get('/cart/checkout', [CartController::class, 'getCheckoutItems']);
    Route::post('/cart/purchase', [CartController::class, 'purchase']);
    Route::get('/cart/purchased-items/{orderId}', [CartController::class, 'getPurchasedItems']);
    Route::post('/cart/save', [ApiController::class, 'saveCart']);
    Route::delete('/cart', [CartController::class, 'clearCart']);
    Route::delete('/cart/item/{product_id}', [CartController::class, 'removeCartItem']);
    Route::post('/products', [ApiController::class, 'store']);
    Route::delete('/products/{id}', [ApiController::class, 'deleteProduct']);
    Route::put('/products/{id}', [ApiController::class, 'updateProduct']);
    Route::get('/products/{id}', [ApiController::class, 'getProductById']);
});
