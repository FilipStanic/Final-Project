<?php

namespace App\Http\Controllers;

use App\Mail\WelcomeMail;
use App\Models\Cart;
use App\Models\Product;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ApiController extends Controller
{
    public function getProducts()
    {

        $products = Product::with('user:id,name,email', 'tags:id,name')->get();

        return response()->json($products);
    }

    public function getProductById($id)
    {
        $product = Product::with('tags')->find($id);

        if (!$product) {
            return response()->json(['error' => 'Product not found'], 404);
        }

        return response()->json($product);
    }


    public function getUserProducts(Request $request)
    {
        $user = Auth::user();

        if ($user->role === 'admin') {
            $products = Product::with('user:id,name,email')->get();
        } else {
            $products = Product::where('user_id', $user->id)->with('user:id,name,email')->get();
        }

        return response()->json($products);
    }



    public function getProductByImagePath($imagePath)
    {
        $product = Product::where('image_path', $imagePath)->first();

        if (!$product) {
            return response()->json(['error' => 'Product not found'], 404);
        }

        return response()->json($product);
    }


    public function deleteProduct($id)
    {
        try {
            $product = Product::findOrFail($id);

            if ($product->user_id !== Auth::id()) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }

            $product->delete();

            return response()->json(['message' => 'Product deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong', 'details' => $e->getMessage()], 500);
        }
    }

    public function updateProduct(Request $request, $id)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:100|regex:/^(\S+\s+?){0,2}\S+$/',
            'description' => 'required|string|max:100',
            'price' => 'required|numeric',
            'category_id' => 'required|exists:categories,id',
            'tags' => 'sometimes|array',
            'tags.*' => 'exists:tags,id'
        ]);

        $product = Product::findOrFail($id);

        if ($product->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $product->update($validatedData);

        if (isset($validatedData['tags'])) {
            $product->tags()->sync($validatedData['tags']);
        }

        return response()->json(['message' => 'Product updated successfully', 'product' => $product], 200);
    }



    public function login(Request $request)
    {
        Log::info('User attempting to log in', ['email' => $request->email]);

        try {
            $credentials = $request->only('email', 'password');

            if (!Auth::attempt($credentials)) {
                Log::warning('Login failed - invalid credentials', ['email' => $request->email]);
                return response()->json(['message' => 'Invalid email or password'], 401);
            }

            $user = Auth::user();

            if ($user->role !== 'admin' && !$user->hasVerifiedEmail()) {
                Log::warning('Login failed - email not verified', ['user_id' => $user->id]);
                return response()->json(['message' => 'Your email is not verified. Please check your inbox.'], 403);
            }

            $token = $user->createToken('Personal Access Token')->plainTextToken;

            Log::info('Login successful', ['user_id' => $user->id]);

            return response()->json([
                'message' => 'Login successful',
                'token' => $token,
                'user' => [
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                ],
            ], 200);
        } catch (\Exception $e) {
            Log::error('Login failed', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Something went wrong', 'details' => $e->getMessage()], 500);
        }
    }


    public function register(Request $request)
    {
        Log::info('Registering new user', ['email' => $request->email]);

        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:35',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8|confirmed',
            ]);

            $user = User::create([
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
                'password' => Hash::make($validatedData['password']),
            ]);

            event(new Registered($user));

            $token = $user->createToken('Personal Access Token')->plainTextToken;

            Log::info('User registered successfully', ['user_id' => $user->id]);

            return response()->json([
                'message' => 'Registration successful. A verification email has been sent to your email address.',
                'token' => $token,
                'user' => [
                    'name' => $user->name,
                    'email' => $user->email,
                ],
            ], 201);
        } catch (\Exception $e) {
            Log::error('User registration failed', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Something went wrong', 'details' => $e->getMessage()], 500);
        }
    }



    public function verifyEmail(Request $request, $id, $hash)
    {
        Log::info('Attempting to verify email', ['user_id' => $id, 'hash' => $hash]);

        try {
            $user = User::findOrFail($id);

            if (!hash_equals($hash, sha1($user->getEmailForVerification()))) {
                Log::warning('Invalid verification link', ['user_id' => $id]);
                return response()->json(['message' => 'Invalid verification link.'], 403);
            }

            if ($user->hasVerifiedEmail()) {
                Log::info('Email already verified', ['user_id' => $id]);
                return response()->json(['message' => 'Email already verified.'], 200);
            }

            $user->markEmailAsVerified();
            Log::info('Email verified successfully', ['user_id' => $id]);
            return response()->json(['message' => 'Email verified successfully.'], 200);
        } catch (\Exception $e) {
            Log::error('Email verification failed', ['user_id' => $id, 'error' => $e->getMessage()]);
            return response()->json(['message' => 'Verification failed. Please try again.'], 500);
        }
    }



    public function resendVerificationEmail(Request $request)
    {
        Log::info('Resending verification email', ['user_id' => $request->user()->id]);

        $request->user()->sendEmailVerificationNotification();

        return response()->json(['message' => 'Verification link sent.'], 200);
    }


    public function getUser(Request $request)
    {
        return response()->json($request->user());
    }

    public function deleteUser($id)
    {
        try {
            $user = User::findOrFail($id);

            if ($user->id !== Auth::id()) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }

            $user->delete();

            return response()->json(['message' => 'User deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong', 'details' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:100|regex:/^(\S+\s+?){0,2}\S+$/',
            'description' => 'required|string|max:100',
            'price' => 'required|numeric',
            'image' => 'required|image|max:10000',
            'category_id' => 'required|exists:categories,id',
            'tags' => 'sometimes|array',
            'tags.*' => 'exists:tags,id'
        ]);

        if (str_word_count($request->title) > 3) {
            return response()->json(['errors' => ['title' => 'Title must not exceed 3 words.']], 422);
        }

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images', 'public');
        } else {
            return response()->json(['error' => 'Image not uploaded correctly'], 400);
        }

        $product = Product::create([
            'title' => $validatedData['title'],
            'description' => $validatedData['description'],
            'price' => $validatedData['price'],
            'image_path' => $imagePath,
            'category_id' => $validatedData['category_id'],
            'user_id' => Auth::id(),
        ]);



        if (isset($validatedData['tags'])) {
            $product->tags()->attach($validatedData['tags']);
        }

        return response()->json(['message' => 'Product created successfully!', 'product' => $product], 201);
    }






}
