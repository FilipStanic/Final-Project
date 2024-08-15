<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;



class ProductController extends Controller
{
    public function index()
    {
        if (auth()->check() && auth()->user()->isAdmin()) {
            $products = Product::with('user')->get();
        } elseif (auth()->check()) {
            $products = auth()->user()->products;
        } else {
            return redirect('/dashboard')->with('message', 'Please log in to access your products.');
        }

        return view('products.index', compact('products'));
    }





    public function create()
    {
        $categories = Category::all();
        return view('products.create', compact('categories'));
    }

    public function store(Request $request)
    {
        $this->validateRequest($request);

        $imagePath = $request->file('image')->store('images', 'public');

        Product::create([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'price' => $request->input('price'),
            'image_path' => $imagePath,
            'category_id' => $request->input('category_id'),
            'user_id' => Auth::id(),
        ]);
        

        return redirect()->route('products.index')->with('success', 'Product created successfully!');
    }

    public function show(Product $product)
    {
        return view('products.show', compact('product'));
    }

    public function edit(Product $product)
    {
        $this->authorizeUser($product);

        $categories = Category::all();
        return view('products.edit', compact('product', 'categories'));
    }

    public function update(Request $request, Product $product)
    {
        $this->authorizeUser($product);
        $this->validateRequest($request, $product);

        $imagePath = $product->image_path; // Default to existing image path

        if ($request->hasFile('image')) {
            if ($product->image_path) {
                Storage::disk('public')->delete($product->image_path);
            }
            $imagePath = $request->file('image')->store('images', 'public');
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

    public function destroy(Product $product)
    {
        $this->authorizeUser($product);

        if ($product->image_path) {
            Storage::disk('public')->delete($product->image_path);
        }
        $product->delete();

        return redirect()->route('products.index')->with('success', 'Product deleted successfully.');
    }

    private function validateRequest(Request $request, Product $product = null)
    {
        $request->validate([
            'title' => 'required|string|max:100|regex:/^(\S+\s+?){0,2}\S+$/',
            'description' => 'nullable|string|max:100',
            'price' => 'required|numeric',
            'image' => $product ? 'nullable|image' : 'required|image',
            'category_id' => 'required',
        ]);

        if (str_word_count($request->title) > 3) {
            return redirect()->back()->withErrors(['title' => 'Title must not exceed 3 words.']);
        }
    }

    private function authorizeUser(Product $product)
    {
        if ($product->user_id !== Auth::id() && Auth::user()->role !== 'admin') {
            abort(403);
        }
    }
}
