<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function getCart(Request $request) {
        $user = $request->user();
        $cart = Cart::where('user_id', $user->id)->with('items')->first();

        if (!$cart) {
            return response()->json(['message' => 'Cart not found'], 404);
        }

        return response()->json($cart);
    }

    public function updateCart(Request $request) {
        $user = $request->user();
        $cart = Cart::where('user_id', $user->id)->firstOrCreate(['user_id' => $user->id]);

        if ($cart) {
            foreach ($request->items as $itemData) {
                $item = $cart->items()->where('product_id', $itemData['product_id'])->first();
                if ($item) {
                    $item->quantity = $itemData['quantity'];
                    $item->save();
                } else {
                    $cart->items()->create([
                        'product_id' => $itemData['product_id'],
                        'quantity' => $itemData['quantity'],
                    ]);
                }
            }
        }

        return response()->json($cart->load('items'));
    }

    public function proceedToCheckout(Request $request) {
        $user = $request->user();
        $cart = Cart::where('user_id', $user->id)->first();

        if ($cart) {
            $cart->status = 'checkout';
            $cart->save();
        } else {
            return response()->json(['message' => 'Cart not found'], 404);
        }

        return response()->json($cart);
    }
}
