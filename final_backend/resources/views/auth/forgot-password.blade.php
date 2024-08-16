@extends('layouts.app')

@section('content')
    <div class="container mx-auto p-6">
        <div class="flex justify-start mb-2">
            <a href="{{ route('login') }}" class="text-gray-600 hover:text-gray-800 transition duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-left" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M5 12l14 0" />
                    <path d="M5 12l6 6" />
                    <path d="M5 12l6 -6" />
                </svg>
            </a>
        </div>

        <div class="flex flex-col items-center justify-center bg-indigo-300 p-8 rounded-lg shadow-md w-full max-w-md mx-auto">
            <h1 class="text-3xl font-bold mb-6 text-gray-800 text-center">Forgot Your Password?</h1>

            <div class="mb-4 text-sm text-white text-center">
                {{ __('Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.') }}
            </div>

            <!-- Session Status -->
            <x-auth-session-status class="mb-4" :status="session('status')" />

            <form method="POST" action="{{ route('password.email') }}" class="w-full space-y-4">
                @csrf

                <!-- Email Address -->
                <div>
                    <label for="email" class="block text-white font-bold mb-2">{{ __('Email') }}</label>
                    <input id="email" type="email" name="email" value="{{ old('email') }}" required autofocus class="block mt-1 w-full border border-gray-300 bg-white rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    @error('email')
                    <p class="mt-2 text-red-500 text-sm">{{ $message }}</p>
                    @enderror
                </div>

                <div class="flex items-center justify-center mt-4">
                    <button type="submit" class="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">
                        {{ __('Email Password Reset Link') }}
                    </button>
                </div>
            </form>
        </div>
    </div>
@endsection
