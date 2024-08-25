<?php

use App\Http\Controllers\ProfileController;
use App\Http\Middleware\AdminMiddleware;
use App\Models\Product;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;

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

    Route::get('/email/verify', function () {
        return view('auth.verify-email');
    })->name('verification.notice');

    Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
        Log::info('Processing email verification', ['user_id' => $request->user()->id]);
        try {
            $request->fulfill();
            Log::info('Email verification successful', ['user_id' => $request->user()->id]);
            return redirect('http://localhost:5173/verification-success');
        } catch (\Exception $e) {
            Log::error('Email verification failed', ['user_id' => $request->user()->id, 'error' => $e->getMessage()]);
            return redirect('http://localhost:5173/verification-error');
        }
    })->middleware(['signed'])->name('verification.verify');

    Route::post('/email/resend', function (Request $request) {
        $request->user()->sendEmailVerificationNotification();
        return back()->with('message', 'Verification link sent!');
    })->middleware('auth')->name('verification.resend');

    Route::middleware(['auth', AdminMiddleware::class])->group(function () {

    });

    require __DIR__.'/auth.php';
});
