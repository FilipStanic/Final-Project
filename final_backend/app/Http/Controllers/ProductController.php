<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::all();
        return view('products.index', compact('products'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();
        return view('products.create', compact('categories'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:100|regex:/^(\S+\s+?){0,2}\S+$/',
            'description' => 'nullable|string|max:100',
            'price' => 'required|numeric',
            'image' => 'required|image',
            'category_id' => 'required',
        ]);

        // Additional validation logic
        if (str_word_count($request->title) > 3) {
            return redirect()->back()->withErrors(['title' => 'Title must not exceed 3 words.']);
        }

        $imagePath = $request->file('image')->store('images', 'public');

        $product = Product::create([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'price' => $request->input('price'),
            'image_path' => $imagePath,
            'category_id' => $request->input('category_id'),
        ]);

        return redirect()->route('products.index')->with('success', 'Product created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return view('products.show', compact('product'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        $categories = Category::all();
        return view('products.edit', compact('product', 'categories'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $request->validate([
            'title' => 'required|string|max:100|regex:/^(\S+\s+?){0,2}\S+$/',
            'description' => 'nullable|string|max:100',
            'price' => 'required|numeric',
            'image' => 'nullable|image',
            'category_id' => 'required',
        ]);

        // Additional validation logic
        if (str_word_count($request->title) > 3) {
            return redirect()->back()->withErrors(['title' => 'Title must not exceed 3 words.']);
        }

        if (strlen($request->description) > 100) {
            return redirect()->back()->withErrors(['description' => 'Description must not exceed 100 characters.']);
        }

        if ($request->hasFile('image')) {
            if ($product->image_path) {
                Storage::disk('public')->delete($product->image_path);
            }

            $imagePath = $request->file('image')->store('images', 'public');
        } else {
            $imagePath = $product->image_path;
        }

        $product->update([
            'title' => $request->title,
            'description' => $request->description,
            'price' => $request->price,
            'image_path' => $imagePath,
            'category_id' => $request->category_id,
        ]);

        return redirect()->route('products.index')->with('success', 'Product updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        if ($product->image_path) {
            Storage::disk('public')->delete($product->image_path);
        }
        $product->delete();

        return redirect()->route('products.index')->with('success', 'Product deleted successfully.');
    }
}
