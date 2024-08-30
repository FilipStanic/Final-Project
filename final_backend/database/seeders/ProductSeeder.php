<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Tag;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'title' => 'Tacos',
                'description' => 'Delicious Mexican dish with soft tortillas, filled with seasoned meat and fresh toppings.',
                'price' => 14.21,
                'image_path' => 'product_images/tacos.jpg',
                'category_id' => 3,
                'user_id' => 1,
                'tags' => [11, 17, 14]
            ],
            [
                'title' => 'Mountain Sunset',
                'description' => 'Beautiful sunset over the mountains, perfect for nature lovers.',
                'price' => 25.00,
                'image_path' => 'product_images/mountain_sunset.jpg',
                'category_id' => 2,
                'user_id' => 1,
                'tags' => [8, 10]
            ],
            [
                'title' => 'Basketball Game',
                'description' => 'High-intensity basketball game action shot.',
                'price' => 30.50,
                'image_path' => 'product_images/basketball_game.jpg',
                'category_id' => 4,
                'user_id' => 1,
                'tags' => [18, 20, 3]
            ],
            [
                'title' => 'Pizza Margherita',
                'description' => 'Classic Italian pizza with fresh tomatoes, mozzarella, and basil.',
                'price' => 18.50,
                'image_path' => 'product_images/pizza_margherita.jpg',
                'category_id' => 3,
                'user_id' => 1,
                'tags' => [13, 14, 15]
            ],
            [
                'title' => 'City Nightscape',
                'description' => 'A stunning night view of a bustling city.',
                'price' => 45.75,
                'image_path' => 'product_images/city_nightscape.jpg',
                'category_id' => 2,
                'user_id' => 1,
                'tags' => [7]
            ],
            [
                'title' => 'Wedding Photography',
                'description' => 'Capture the special moments of a beautiful wedding.',
                'price' => 50.00,
                'image_path' => 'product_images/wedding_photography.jpg',
                'category_id' => 1,
                'user_id' => 1,
                'tags' => [2, 3]
            ],
            [
                'title' => 'Sushi Platter',
                'description' => 'Assorted sushi with fresh fish, rice, and seaweed, served with soy sauce.',
                'price' => 32.10,
                'image_path' => 'product_images/sushi_platter.jpg',
                'category_id' => 3,
                'user_id' => 1,
                'tags' => [12, 14, 15]
            ],
            [
                'title' => 'Desert Landscape',
                'description' => 'Vast desert with endless sand dunes under the bright sun.',
                'price' => 29.90,
                'image_path' => 'product_images/desert_landscape.jpg',
                'category_id' => 2,
                'user_id' => 1,
                'tags' => [8]
            ],
            [
                'title' => 'Football Action',
                'description' => 'Exciting action shot from a high-stakes football game.',
                'price' => 34.99,
                'image_path' => 'product_images/football_action.jpg',
                'category_id' => 4,
                'user_id' => 1,
                'tags' => [19, 21]
            ],
            [
                'title' => 'Pasta Carbonara',
                'description' => 'Creamy Italian pasta with pancetta, egg, and Parmesan cheese.',
                'price' => 21.90,
                'image_path' => 'product_images/pasta_carbonara.jpg',
                'category_id' => 3,
                'user_id' => 1,
                'tags' => [13, 14]
            ],
            [
                'title' => 'Forest Path',
                'description' => 'A peaceful path winding through a dense forest.',
                'price' => 38.00,
                'image_path' => 'product_images/forest_path.jpg',
                'category_id' => 2,
                'user_id' => 1,
                'tags' => [9, 10]
            ],
            [
                'title' => 'BBQ Ribs',
                'description' => 'Tender pork ribs slow-cooked and smothered in barbecue sauce.',
                'price' => 29.99,
                'image_path' => 'product_images/bbq_ribs.jpg',
                'category_id' => 3,
                'user_id' => 1,
                'tags' => [15, 14]
            ],
            [
                'title' => 'Portrait Photography',
                'description' => 'Capturing the essence of individuals in stunning portrait photos.',
                'price' => 40.50,
                'image_path' => 'product_images/portrait_photography.jpg',
                'category_id' => 1,
                'user_id' => 1,
                'tags' => [1, 5, 24]
            ],
            [
                'title' => 'Extreme Sports',
                'description' => 'Adrenaline-pumping action shot of extreme sports.',
                'price' => 50.00,
                'image_path' => 'product_images/extreme_sports.jpg',
                'category_id' => 4,
                'user_id' => 1,
                'tags' => [21, 8]
            ],
            [
                'title' => 'Veggie Burger',
                'description' => 'Delicious plant-based burger with fresh veggies and vegan cheese.',
                'price' => 12.75,
                'image_path' => 'product_images/veggie_burger.jpg',
                'category_id' => 3,
                'user_id' => 1,
                'tags' => [16, 17]
            ],
            [
                'title' => 'Street Photography',
                'description' => 'Candid moments captured on the streets of a bustling city.',
                'price' => 35.00,
                'image_path' => 'product_images/street_photography.jpg',
                'category_id' => 1,
                'user_id' => 1,
                'tags' => [4, 5]
            ],
            [
                'title' => 'Ocean Waves',
                'description' => 'Rolling waves crashing against the shore, captured in high detail.',
                'price' => 28.40,
                'image_path' => 'product_images/ocean_waves.jpg',
                'category_id' => 2,
                'user_id' => 1,
                'tags' => [3, 4]
            ],
            [
                'title' => 'Running Athlete',
                'description' => 'Athlete in mid-stride during a competitive running event.',
                'price' => 27.99,
                'image_path' => 'product_images/running_athlete.jpg',
                'category_id' => 4,
                'user_id' => 1,
                'tags' => [20, 21]
            ],
            [
                'title' => 'Caesar Salad',
                'description' => 'Crisp romaine lettuce with Caesar dressing, croutons, and Parmesan cheese.',
                'price' => 11.50,
                'image_path' => 'product_images/caesar_salad.jpg',
                'category_id' => 3,
                'user_id' => 1,
                'tags' => [14, 17]
            ],
            [
                'title' => 'Sunrise Over the Ocean',
                'description' => 'Breathtaking view of the sun rising over the ocean horizon.',
                'price' => 33.25,
                'image_path' => 'product_images/sunrise_ocean.jpg',
                'category_id' => 2,
                'user_id' => 1,
                'tags' => [10, 6]
            ],
            [
                'title' => 'Abstract Painting',
                'description' => 'A vibrant and expressive abstract painting.',
                'price' => 120.00,
                'image_path' => 'product_images/abstract_painting.jpg',
                'category_id' => 5,
                'user_id' => 1,
                'tags' => [26, 24]
            ],
            [
                'title' => 'Digital Sculpture',
                'description' => 'A modern digital sculpture showcasing intricate designs.',
                'price' => 85.50,
                'image_path' => 'product_images/digital_sculpture.jpg',
                'category_id' => 5,
                'user_id' => 1,
                'tags' => [25, 28]
            ],
            [
                'title' => 'Pop Art Collage',
                'description' => 'A colorful and eclectic pop art collage.',
                'price' => 70.75,
                'image_path' => 'product_images/pop_art_collage.jpg',
                'category_id' => 5,
                'user_id' => 1,
                'tags' => [27, 29]
            ],
            [
                'title' => 'Street Art Graffiti',
                'description' => 'Bold and striking street art graffiti on canvas.',
                'price' => 95.00,
                'image_path' => 'product_images/street_art_graffiti.jpg',
                'category_id' => 5,
                'user_id' => 1,
                'tags' => [28, 30]
            ],
            [
                'title' => 'Calligraphy Art',
                'description' => 'Elegant calligraphy art with traditional and modern elements.',
                'price' => 60.00,
                'image_path' => 'product_images/calligraphy_art.jpg',
                'category_id' => 5,
                'user_id' => 1,
                'tags' => [23, 24]
            ],
            [
                'title' => 'Butterfly on Flower',
                'description' => 'A beautiful butterfly perched delicately on a vibrant flower.',
                'price' => 20.00,
                'image_path' => 'product_images/butterfly_on_flower.jpg',
                'category_id' => 6,
                'user_id' => 1,
                'tags' => [32, 33, 34]
            ],
            [
                'title' => 'Deer in the Woods',
                'description' => 'A serene moment of a deer grazing peacefully in the woods.',
                'price' => 35.00,
                'image_path' => 'product_images/deer_in_woods.jpg',
                'category_id' => 6,
                'user_id' => 1,
                'tags' => [31, 33, 9]
            ],
            [
                'title' => 'Blooming Rose',
                'description' => 'A close-up shot of a blooming rose, showcasing its delicate petals.',
                'price' => 15.00,
                'image_path' => 'product_images/blooming_rose.jpg',
                'category_id' => 6,
                'user_id' => 1,
                'tags' => [32, 34]
            ],
            [
                'title' => 'Mountain Waterfall',
                'description' => 'A crystal-clear river flowing through the majestic mountains.',
                'price' => 40.00,
                'image_path' => 'product_images/mountain_waterfall.jpg',
                'category_id' => 6,
                'user_id' => 1,
                'tags' => [6, 8, 9]
            ],
        ];


        foreach ($products as $productData) {
            $tags = $productData['tags'];
            unset($productData['tags']);

            $product = Product::create($productData);
            $product->tags()->attach($tags);
        }
    }
}
