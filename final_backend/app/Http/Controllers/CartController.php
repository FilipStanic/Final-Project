<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;

class CartController extends Controller
{

    public function getCart(Request $request) {
        $user = $request->user();

        try {
            $cartItems = Cart::where('user_id', $user->id)
                ->with('product:id,title,price,image_path')
                ->get();

            if ($cartItems->isEmpty()) {
                return response()->json(['message' => 'Cart is empty'], 404);
            }

            $cartItems = $cartItems->map(function($item) {
                return [
                    'id' => $item->product_id,
                    'title' => $item->product->title,
                    'price' => $item->product->price,
                    'image_path' => $item->product->image_path,
                    'quantity' => $item->quantity
                ];
            });

            return response()->json($cartItems);
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



    public function clearCart(Request $request) {
        $user = $request->user();

        try {
            $deletedItems = Cart::where('user_id', $user->id)
                ->whereIn('status', ['pending', 'checkout'])
                ->delete();

            if ($deletedItems > 0) {
                return response()->json(['message' => 'Pending items cleared successfully']);
            } else {
                return response()->json(['message' => 'No pending items to clear'], 404);
            }
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

    public function checkout(Request $request)
    {
        $user = $request->user();


        $cartItems = Cart::where('user_id', $user->id)
            ->where('status', 'pending')
            ->get();

        if ($cartItems->isEmpty()) {
            return response()->json(['message' => 'No items in the cart to checkout'], 400);
        }

        foreach ($cartItems as $cartItem) {
            $cartItem->status = 'checkout';
            $cartItem->save();
        }

        return response()->json(['message' => 'Checkout completed successfully'], 200);
    }


    public function getCheckoutItems(Request $request) {
        $user = $request->user();

        try {
            $checkoutItems = Cart::where('user_id', $user->id)
                ->where('status', 'checkout')
                ->with('product:id,title,price,image_path')
                ->get();

            if ($checkoutItems->isEmpty()) {
                return response()->json(['message' => 'No items in checkout'], 404);
            }

            $checkoutItems = $checkoutItems->map(function($item) {
                return [
                    'id' => $item->product_id,
                    'title' => $item->product->title,
                    'price' => $item->product->price,
                    'image_path' => $item->product->image_path,
                    'quantity' => $item->quantity
                ];
            });

            return response()->json($checkoutItems);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }

    public function purchase(Request $request)
    {
        $user = $request->user();

        try {
            $cartItems = Cart::where('user_id', $user->id)->where('status', 'checkout')->get();

            if ($cartItems->isEmpty()) {
                return response()->json(['message' => 'No items to purchase'], 404);
            }

            foreach ($cartItems as $cartItem) {
                $cartItem->status = 'purchased';
                $cartItem->save();
            }

            return response()->json(['message' => 'Purchase successful']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Internal Server Error', 'details' => $e->getMessage()], 500);
        }
    }







}
