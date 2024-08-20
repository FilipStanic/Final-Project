<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;

class CartController extends Controller
{

    public function getCart(Request $request) {
        $user = $request->user();

        try {
            $cart = Cart::where('user_id', $user->id)->with('product')->get();

            if ($cart->isEmpty()) {
                return response()->json(['message' => 'Cart is empty'], 404);
            }


            return response()->json($cart);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }

    public function updateCart(Request $request) {
        $user = $request->user();


        try {
            foreach ($request->items as $itemData) {


                $product_id = $itemData['product_id'] ?? $itemData['id'];

                $cart = Cart::where('user_id', $user->id)
                    ->where('product_id', $product_id)
                    ->first();

                if ($cart) {

                    $cart->quantity = $itemData['quantity'];
                    $cart->save();
                } else {

                    Cart::create([
                        'user_id' => $user->id,
                        'product_id' => $product_id,
                        'quantity' => $itemData['quantity'],
                    ]);
                }
            }

            $cartItems = Cart::where('user_id', $user->id)->with('product')->get();


            return response()->json($cartItems);
        } catch (\Exception $e) {

            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }


    public function proceedToCheckout(Request $request) {
        $user = $request->user();

        try {


            $cartItems = Cart::where('user_id', $user->id)->get();

            if ($cartItems->isEmpty()) {

                return response()->json(['message' => 'Cart not found'], 404);
            }

            foreach ($cartItems as $cart) {


                $cart->status = 'checkout';
                $cart->save();
            }



            return response()->json(['message' => 'Checkout successful', 'cart' => $cartItems]);

        } catch (\Exception $e) {

            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }

    public function clearCart(Request $request) {
        $user = $request->user();

        try {

            Cart::where('user_id', $user->id)->delete();


            return response()->json(['message' => 'Cart cleared successfully']);
        } catch (\Exception $e) {

            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }

    public function removeCartItem($product_id, Request $request) {
        $user = $request->user();

        try {
            $cartItems = Cart::where('user_id', $user->id)
                ->whereHas('product', function ($query) use ($product_id) {
                    $query->where('id', $product_id);
                })
                ->get();
            foreach ($cartItems as $item) {
                $item->delete();
            }


            return response()->json(['message' => 'Item removed from cart successfully']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }




}
