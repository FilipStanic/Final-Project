<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    public function index()
    {
        $tags = Tag::all();
        return response()->json($tags);
    }

    public function tagsByCategory($categoryId)
    {
        $category = Category::with('tags')->find($categoryId);

        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        return response()->json($category->tags);
    }
}
