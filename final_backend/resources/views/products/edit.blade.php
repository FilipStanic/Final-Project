@extends('layouts.app')

@section('content')
    <div class="container mx-auto p-6">
        <div class="flex justify-start mb-2">
            <a href="{{ route('products.index') }}" class="text-gray-600 hover:text-gray-800 transition duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-left" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M5 12l14 0" />
                    <path d="M5 12l6 6" />
                    <path d="M5 12l6 -6" />
                </svg>
            </a>
        </div>

        <div class="flex flex-col items-center justify-center bg-indigo-300 p-8 rounded-lg shadow-md w-11/12 max-w-md mx-auto">
            <h1 class="text-3xl font-bold mb-6 text-gray-800 text-center">Edit Photography Product</h1>

            @if ($errors->any())
                <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    <strong class="font-bold">Whoops!</strong>
                    <span class="block sm:inline">There were some problems with your input.</span>
                    <ul class="list-disc pl-5">
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif

            <form action="{{ route('products.update', $product->id) }}" method="POST" enctype="multipart/form-data" class="w-full space-y-4">
                @csrf
                @method('PUT')

                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2">Title:</label>
                    <input type="text" name="title" value="{{ old('title', $product->title) }}" required class="border border-gray-300 rounded-md p-2 w-full text-black focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <small class="text-gray-500">Maximum 3 words, 100 characters</small>
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2">Description:</label>
                    <textarea name="description" required class="border border-gray-300 rounded-md p-2 w-full text-black focus:outline-none focus:ring-2 focus:ring-blue-500">{{ old('description', $product->description) }}</textarea>
                    <small class="text-gray-500">Maximum 100 characters</small>
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2">Price:</label>
                    <input type="number" name="price" value="{{ old('price', $product->price) }}" required class="border border-gray-300 rounded-md p-2 w-full text-black focus:outline-none focus:ring-2 focus:ring-blue-500">
                    @error('price')
                    <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2">Category:</label>
                    <select name="category_id" required class="border border-gray-300 rounded-md p-2 w-full text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                        @foreach ($categories as $category)
                            <option value="{{ $category->id }}" {{ (isset($product) && $product->category_id == $category->id) ? 'selected' : '' }}>
                                {{ ucfirst($category->name) }}
                            </option>
                        @endforeach
                    </select>
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2">Image:</label>
                    <input type="file" name="image" class="border border-gray-300 rounded-md p-2 w-full text-black focus:outline-none focus:ring-2 focus:ring-blue-500">
                    @if ($product->image_path)
                        <img src="{{ asset('storage/'.$product->image_path) }}" alt="{{ $product->title }}" class="mt-2 mb-2" width="100">
                    @endif
                </div>

                <button type="submit" class="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">Update</button>
            </form>
        </div>
    </div>
@endsection
