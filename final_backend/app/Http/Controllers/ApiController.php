<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ApiController extends Controller
{
    public function getProducts()
    {
        $products = Product::all();
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
            ], 200);
        } catch (\Exception $e) {

            return response()->json(['error' => 'Something went wrong', 'details' => $e->getMessage()], 500);
        }
    }


}
