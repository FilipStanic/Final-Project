<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\ProfileController;
use App\Http\Middleware\AdminMiddleware;
use App\Models\Product;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;

Route::middleware(['web'])->group(function () {
    Route::get('/', function () {
        return view('welcome');
    });

    Route::get('/register/success', function () {
        return view('auth.register-success');
    })->name('register.success');


    Route::get('/dashboard', function () {
        $products = Product::with('category')->get();
        return view('dashboard', compact('products'));
    })->name('dashboard');

    Route::middleware('auth')->group(function () {
        Route::get('/products', [ProductController::class, 'index'])->name('products.index');
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

        Route::resource('products', ProductController::class)->only([
            'create', 'store', 'show', 'edit', 'update', 'destroy'

        ]);
    });

    Route::middleware(['auth', AdminMiddleware::class])->group(function () {

    });

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/download/all-images/{order_id}', [CartController::class, 'downloadAllImages'])->name('download.all');
    });

    require __DIR__.'/auth.php';
});
