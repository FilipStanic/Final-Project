<?php

use App\Http\Controllers\ProfileController;
use App\Models\Product;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Middleware\AdminMiddleware;


Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    $products = Product::with('category')->get();
    return view('dashboard', compact('products'));
})->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', AdminMiddleware::class])->group(function () {
    Route::resource('products', ProductController::class);
});


require __DIR__.'/auth.php';
