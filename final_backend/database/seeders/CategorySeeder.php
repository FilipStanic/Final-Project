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
                'Portrait', 'Wedding', 'Street Photography', 'Candid', 'Headshots'
            ],
            'Landscape' => [
                'Water', 'Cityscape', 'Mountains', 'Forest', 'Sunset/Sunrise'
            ],
            'Food' => [
                'Mexican', 'Asian', 'Italian', 'Street Food', 'Gourmet', 'Vegan', 'Breakfast'
            ],
            'Sports' => [
                'Basketball', 'Football', 'Running', 'Extreme Sports', 'Indoor Sports'
            ],
            'Art' => [
                'Calligraphy', 'Abstract', 'Sculpture', 'Digital Art', 'Pop Art', 'Street Art', 'Collage', 'Graffiti'
            ],
            'Nature' => [
                'Animals', 'Plants', 'Wildlife', 'Flowers', 'Insects', 'Underwater', 'Macro'
    ],
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
