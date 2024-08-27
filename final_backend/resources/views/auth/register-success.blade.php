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
            <h1 class="text-3xl font-bold mb-6 text-green-500 text-center">Registration Successful</h1>
            <p class="text-green-700 text-center mb-6">Thank you for registering! Your account has been created successfully.</p>
            <p class="text-gray-800 text-center mb-6">An email has been sent to your email address. Please check your inbox and verify your email to complete the registration process.</p>

            <div class="flex items-center justify-center mb-4">
                <a href="{{ route('login') }}" class="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">Go to Login</a>
            </div>
        </div>
    </div>
@endsection
