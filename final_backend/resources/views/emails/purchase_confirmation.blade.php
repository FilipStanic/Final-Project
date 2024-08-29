<x-mail::message>
    {{-- Greeting --}}
    <p>{{ __('Dear') }} {{ $user->name }},</p>
    <p>{{ __('Thank you for your purchase! Below are the details of your order:') }}</p>

    {{-- Purchase Items --}}
    @foreach ($cartItems as $item)
        <p>{{ $item->product->title }} - ${{ number_format($item->product->price, 2) }} x {{ $item->quantity }}</p>
    @endforeach

    {{-- Outro Lines --}}
    <p>{{ __('We hope you enjoy your purchase!') }}</p>
</x-mail::message>
