<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-gradient-to-r from-indigo-300 to-gray-100">

<header class="w-full">
    <div class="flex justify-between items-center p-4 w-full">
        <div class="flex items-center space-x-2">
            <a href="/">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-access-point" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M12 12l0 .01" />
                    <path d="M14.828 9.172a4 4 0 0 1 0 5.656" />
                    <path d="M17.657 6.343a8 8 0 0 1 0 11.314" />
                    <path d="M9.168 14.828a4 4 0 0 1 0 -5.656" />
                    <path d="M6.337 17.657a8 8 0 0 1 0 -11.314" />
                </svg>
            </a>
            <h2 class="text-white text-xl">
                @if (Auth::check())
                    Welcome, {{ Auth::user()->name }}!
                @else
                    Welcome to Echoes!
                @endif
            </h2>
        </div>

        <div class="flex space-x-2">
            @if (Auth::check())
                <form method="POST" action="{{ route('logout') }}">
                    @csrf
                    <button type="submit" class="text-white bg-red-500 hover:bg-red-700 rounded px-4 py-2">Log Out</button>
                </form>
            @else
                <a href="{{ route('login') }}" class="text-white bg-blue-500 hover:bg-blue-700 rounded px-4 py-2">Log In</a>
                <a href="{{ route('register') }}" class="text-white bg-purple-500 hover:bg-purple-700 rounded px-4 py-2">Register</a>
            @endif
        </div>
    </div>
</header>

@yield('content')
</body>
</html>
