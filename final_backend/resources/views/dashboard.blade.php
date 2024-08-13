@extends('layouts.app')

@section('content')
    <div class="p-5 md:p-10">
        <div class="mb-5">
            <a href="{{ url('/products') }}" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
                View All Products
            </a>
        </div>

        <div class="columns-1 gap-2 lg:gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
            @foreach ($products as $product)
                <div class="mb-5 break-inside-avoid">
                    @if ($product->image_path)
                        <img src="{{ asset(' storage/'.$product->image_path) }}"
                             alt="{{ $product->title }}"
                             class="w-full h-auto object-cover transition-transform duration-300 hover:scale-105">
                    @else
                        <p class="text-red-500 text-center">No Image Available</p>
                    @endif
                </div>
            @endforeach
        </div>
    </div>
@endsection
