@extends('layouts.app')

@section('content')
    <div class="container mx-auto p-6">
        <div class="flex justify-start mb-2">
            <a href="{{ route('dashboard') }}" class="text-gray-600 hover:text-gray-800 transition duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-left" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M5 12l14 0" />
                    <path d="M5 12l6 6" />
                    <path d="M5 12l6 -6" />
                </svg>
            </a>
        </div>

        <div class="flex flex-col items-center justify-center bg-indigo-300 p-8 rounded-lg shadow-md w-full max-w-md mx-auto">
            <h1 class="text-3xl font-bold mb-6 text-gray-800 text-center">Register</h1>

            @if ($errors->any())
                <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    <strong class="font-bold">Whoops!</strong>
                    <span class="block sm:inline">There were some problems with your input.</span>
                    <ul class="list-disc pl-5 mt-2">
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif

            <form method="POST" action="{{ route('register') }}" class="w-full space-y-4">
                @csrf

                <div class="mb-4">
                    <label for="name" class="block text-gray-700 font-bold mb-2">Name:</label>
                    <input id="name" type="text" name="name" :value="old('name')" required class="border border-gray-300 rounded-md p-2 w-full text-black focus:outline-none focus:ring-2 focus:ring-blue-500" autofocus autocomplete="name">
                    @error('name')
                    <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div class="mb-4">
                    <label for="email" class="block text-gray-700 font-bold mb-2">Email:</label>
                    <input id="email" type="email" name="email" :value="old('email')" required class="border border-gray-300 rounded-md p-2 w-full text-black focus:outline-none focus:ring-2 focus:ring-blue-500" autocomplete="username">
                    @error('email')
                    <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div class="mb-4">
                    <label for="password" class="block text-gray-700 font-bold mb-2">Password:</label>
                    <input id="password" type="password" name="password" required class="border border-gray-300 rounded-md p-2 w-full text-black focus:outline-none focus:ring-2 focus:ring-blue-500" autocomplete="new-password">
                    @error('password')
                    <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div class="mb-4">
                    <label for="password_confirmation" class="block text-gray-700 font-bold mb-2">Confirm Password:</label>
                    <input id="password_confirmation" type="password" name="password_confirmation" required class="border border-gray-300 rounded-md p-2 w-full text-black focus:outline-none focus:ring-2 focus:ring-blue-500" autocomplete="new-password">
                    @error('password_confirmation')
                    <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div class="flex items-center justify-center mb-4">
                    <button type="submit" class="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">Register</button>
                </div>
            </form>

            <div class="mt-8 text-center px-4">
                <p class="text-gray-700">Already have an account?</p>
                <a href="{{ route('login') }}" class="text-blue-600 hover:text-blue-800 font-bold ml-2">Log In</a>
            </div>
        </div>
    </div>
@endsection
