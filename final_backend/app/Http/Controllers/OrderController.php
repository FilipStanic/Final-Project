<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function createOrder(Request $request)
    {
        $user = $request->user();
        $cartItems = Cart::where('user_id', $user->id)
            ->where('status', 'pending')
            ->get();


        $totalAmount = $cartItems->sum(function($item) {
            return $item->product->price * $item->quantity;
        });


        $order = Order::create([
            'user_id' => $user->id,
            'total_amount' => $totalAmount,
            'status' => 'pending',
        ]);


        foreach ($cartItems as $item) {
            $item->update(['order_id' => $order->id, 'status' => 'purchased']);
        }

        return response()->json([
            'order_id' => $order->id,
            'total_amount' => $totalAmount,
        ]);
    }

}
