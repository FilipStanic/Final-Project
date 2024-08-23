<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Tag;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = [
            'People' => [
                'Portrait', 'Kids', 'Wedding', 'Fashion', 'Street', 'Candid', 'Family', 'Headshots', 'Lifestyle', 'Selfie'
            ],
            'Landscape' => [
                'Ocean', 'Desert', 'City', 'Mountains', 'Forest', 'Sunrise', 'Sunset', 'Rivers', 'Nightscape', 'Aerial'
            ],
            'Food' => [
                'Italian', 'Mexican', 'Asian', 'Desserts', 'Beverages', 'Street Food', 'Vegan', 'Breakfast', 'Seafood', 'Gourmet'
            ],
            'Nature' => [
                'Animals', 'Plants', 'Wildlife', 'Flowers', 'Insects', 'Underwater', 'Landscapes', 'Forests', 'Birds', 'Macro'
            ],
            'Sports' => [
                'Basketball', 'Indoor', 'Football', 'Running', 'Cycling', 'Swimming', 'Tennis', 'Extreme', 'Gym', 'Yoga'
            ],
            'Art' => [
                'Drawing', 'AI', 'Painting', 'Sculpture', 'Digital Art', 'Calligraphy', 'Collage', 'Abstract', 'Pop Art', 'Street Art'
            ]
        ];

        foreach ($categories as $categoryName => $tags) {
            $category = Category::create(['name' => $categoryName]);

            foreach ($tags as $tagName) {
                $tag = Tag::firstOrCreate(['name' => $tagName]);
                $category->tags()->attach($tag);
            }
        }
    }
}
