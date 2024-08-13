@extends('layouts.app')

@section('content')
    <div class="container mt-4">

        <a href="{{ route('products.create') }}" class="text-white bg-blue-600 hover:bg-blue-500 rounded px-4 py-2 ml-4">
            Add New Image
        </a>

        <div class="grid grid-cols-3 gap-4 p-4 mt-4">
            @foreach ($products as $product)
                <div class="bg-white p-4 rounded-lg shadow">
                    <h2 class="text-xl font-semibold text-center">{{ $product->title }}</h2>
                    <p class="text-black0 mb-2">Category: <span class="font-bold text-gray-800">{{ ucfirst($product->category->name) }}</span></p>
                    <p class="font-bold mb-2">Price: <span class="text-green-500">${{ $product->price }}</span></p>
                    @if ($product->image_path)
                        <img src="{{ asset('storage/'.$product->image_path) }}" alt="{{ $product->title }}" class="mb-2 w-full h-48 object-cover rounded">
                    @endif
                    <p class="text-black italic w-full overflow-hidden">{{ $product->description }}</p>
                    <div class="mt-4">
                        <a href="{{ route('products.show', $product->id) }}" class="text-blue-500 hover:underline">View</a>
                        <a href="{{ route('products.edit', $product->id) }}" class="text-yellow-500 hover:underline">Edit</a>
                        <form action="{{ route('products.destroy', $product->id) }}" method="POST" style="display:inline;">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="text-red-500 hover:underline">Delete</button>
                        </form>
                    </div>
                </div>
            @endforeach
        </div>
    </div>
@endsection
