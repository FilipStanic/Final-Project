@extends('layouts.app')

@section('content')
    <div class="container mx-auto flex justify-center items-center min-h-screen bg-cover bg-center">
        <div class="text-center">
            <h1 class="text-8xl font-bold text-white mb-8">Echoes</h1>
            @if (Route::has('login'))
                <div class="space-x-4">
                    <a href="{{ route('dashboard') }}" class="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
                        Check out the images
                    </a>
                </div>
            @endif
        </div>
    </div>
@endsection
