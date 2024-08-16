<?php

use App\Http\Controllers\ProfileController;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Middleware\AdminMiddleware;

Route::middleware(['web'])->group(function () {
    Route::get('/', function () {
        return view('welcome');
    });

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

    require __DIR__.'/auth.php';
});
