<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $this->call(CategorySeeder::class);
        $this->call(ProductSeeder::class);

//        \App\Models\User::factory(10)->create();
//        \App\Models\Product::factory()->count(10)->create();
          User::factory()->admin()->create();



    }


}
