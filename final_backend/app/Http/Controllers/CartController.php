<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;

class CartController extends Controller
{

    public function getCart(Request $request) {
        $user = $request->user();

        try {
            \Log::info('Fetching cart for user', ['user_id' => $user->id]);
            $cart = Cart::where('user_id', $user->id)->with('product')->get();

            if ($cart->isEmpty()) {
                \Log::info('No items found in cart for user', ['user_id' => $user->id]);
                return response()->json(['message' => 'Cart is empty'], 404);
            }

            \Log::info('Cart retrieved successfully', ['user_id' => $user->id, 'cart_items' => $cart]);

            return response()->json($cart);
        } catch (\Exception $e) {
            \Log::error('Error fetching cart: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }

    public function updateCart(Request $request) {
        $user = $request->user();
        \Log::info('Received updateCart request', ['user_id' => $user->id, 'items' => $request->items]);

        try {
            foreach ($request->items as $itemData) {
                \Log::info('Processing item', ['product_id' => $itemData['product_id'] ?? $itemData['id'], 'quantity' => $itemData['quantity']]);

                $product_id = $itemData['product_id'] ?? $itemData['id'];

                $cart = Cart::where('user_id', $user->id)
                    ->where('product_id', $product_id)
                    ->first();

                if ($cart) {
                    \Log::info('Updating existing cart item');
                    $cart->quantity = $itemData['quantity'];
                    $cart->save();
                } else {
                    \Log::info('Creating new cart item');
                    Cart::create([
                        'user_id' => $user->id,
                        'product_id' => $product_id,
                        'quantity' => $itemData['quantity'],
                    ]);
                }
            }

            $cartItems = Cart::where('user_id', $user->id)->with('product')->get();
            \Log::info('Cart updated successfully', ['cart_items' => $cartItems]);

            return response()->json($cartItems);
        } catch (\Exception $e) {
            \Log::error('Error updating cart: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }


    public function proceedToCheckout(Request $request) {
        $user = $request->user();

        try {
            \Log::info('Received proceedToCheckout request', ['user_id' => $user->id]);

            $cartItems = Cart::where('user_id', $user->id)->get();

            if ($cartItems->isEmpty()) {
                \Log::warning('No cart items found for user', ['user_id' => $user->id]);
                return response()->json(['message' => 'Cart not found'], 404);
            }

            foreach ($cartItems as $cart) {
                \Log::info('Processing cart item for checkout', ['cart_id' => $cart->id, 'product_id' => $cart->product_id]);

                $cart->status = 'checkout';
                $cart->save();
            }

            \Log::info('Checkout process completed successfully for user', ['user_id' => $user->id]);

            return response()->json(['message' => 'Checkout successful', 'cart' => $cartItems]);

        } catch (\Exception $e) {
            \Log::error('Error during checkout: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }

    public function clearCart(Request $request) {
        $user = $request->user();

        try {
            \Log::info('Clearing cart for user', ['user_id' => $user->id]);

            // Delete all cart items for the user
            Cart::where('user_id', $user->id)->delete();

            \Log::info('Cart cleared successfully for user', ['user_id' => $user->id]);

            return response()->json(['message' => 'Cart cleared successfully']);
        } catch (\Exception $e) {
            \Log::error('Error clearing cart: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }

    public function removeCartItem($product_id, Request $request) {
        $user = $request->user();

        try {
            \Log::info('Removing item from cart', ['user_id' => $user->id, 'product_id' => $product_id]);

            // Assuming 'product_id' is not directly in the cart table, find the cart items related to the product
            $cartItems = Cart::where('user_id', $user->id)
                ->whereHas('product', function ($query) use ($product_id) {
                    $query->where('id', $product_id);
                })
                ->get();

            // Delete each item found
            foreach ($cartItems as $item) {
                $item->delete();
            }

            \Log::info('Item removed from cart successfully', ['user_id' => $user->id, 'product_id' => $product_id]);

            return response()->json(['message' => 'Item removed from cart successfully']);
        } catch (\Exception $e) {
            \Log::error('Error removing item from cart: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }




}
