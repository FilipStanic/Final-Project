@extends('layouts.app')

@section('content')
    <div>
            <a href="{{ route('products.index') }}">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-left absolute" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M5 12l14 0" />
                    <path d="M5 12l6 6" />
                    <path d="M5 12l6 -6" />
                </svg>
            </a>
    </div>
    <div class="container mx-auto p-4">
        <h1 class="text-4xl font-bold mb-4 text-center">{{ $product->title }}</h1>
        @if ($product->image_path)
            <div class="flex justify-center">
                <img src="{{ asset('storage/'.$product->image_path) }}" alt="{{ $product->title }}" class="mb-4 w-1/3 rounded-lg content-center">
            </div>
        @endif
        <div class="text-center">
            <p class="text-black mb-4 italic">{{ $product->description }}</p>
            <p class="font-bold mb-4">Price: <span class="text-green-500">${{ $product->price }}</span></p>
            <div class="mt-4">
                <a href="{{ route('products.edit', $product->id) }}" class="text-yellow-500 hover:underline mr-4">Edit</a>
                <form action="{{ route('products.destroy', $product->id) }}" method="POST" style="display:inline-block;">
                    @csrf
                    @method('DELETE')
                    <button type="submit" class="text-red-500 hover:underline">Delete</button>
                </form>
            </div>
        </div>

    </div>
@endsection
