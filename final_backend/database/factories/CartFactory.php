<?php

namespace Database\Factories;

use App\Models\Cart;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class CartFactory extends Factory
{
    protected $model = Cart::class;

    public function definition(): array
    {

        $user = User::inRandomOrder()->first();
        $product = Product::inRandomOrder()->first();
        $quantity = 1;

        return [
            'user_id' => $user ? $user->id : null,
            'product_id' => $product ? $product->id : null,
            'quantity' => $quantity,
        ];
    }
}
