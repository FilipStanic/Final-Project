<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ApiController extends Controller
{
    public function getProducts()
    {
        $products = Product::all();
        return response()->json($products);
    }

    public function getUserProducts(Request $request)
    {
        $user = Auth::user();

        if ($user->role === 'admin') {
            $products = Product::all();
        } else {
            $products = Product::where('user_id', $user->id)->get();
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

    public function login(Request $request)
    {
        try {
            $credentials = $request->only('email', 'password');

            if (!Auth::attempt($credentials)) {
                return response()->json(['message' => 'Invalid email or password'], 401);
            }

            $user = Auth::user();
            $token = $user->createToken('Personal Access Token')->plainTextToken;

            return response()->json([
                'message' => 'Login successful',
                'token' => $token,
                'user' => [
                    'name' => $user->name,
                ],
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong', 'details' => $e->getMessage()], 500);
        }
    }


    public function register(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8|confirmed',
            ]);

            $user = User::create([
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
                'password' => Hash::make($validatedData['password']),
            ]);

            $token = $user->createToken('Personal Access Token')->plainTextToken;

            return response()->json([
                'message' => 'Registration successful',
                'token' => $token,
                'user' => [
                    'name' => $user->name,
                ],
            ], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong', 'details' => $e->getMessage()], 500);
        }
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



}
