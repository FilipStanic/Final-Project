<x-mail::message>
    {{-- Greeting --}}
    <h1 class="text-lg font-semibold">{{ __('Dear') }} {{ $user->name }},</h1>
    <p>{{ __('Thank you for your purchase! Below are the details of your order:') }}</p>

    <x-mail::table>
        @foreach ($cartItems as $item)
            <tr>
                <td style="padding: 10px 0;">
                    <img src="{{ asset('storage/' . $item->product->image_path) }}" alt="{{ $item->product->title }}" style="width: 80px; height: auto; border-radius: 8px; margin-right: 20px;">
                </td>
                <td style="padding: 10px 0;">
                    <strong style="font-size: 16px;">{{ $item->product->title }}</strong>
                    <br>
                    <span style="color: #555;">Price: ${{ number_format($item->product->price, 2) }} x {{ $item->quantity }}</span>
                </td>
            </tr>
        @endforeach
    </x-mail::table>

    <p>{{ __('We hope you enjoy your purchase!') }}</p>
</x-mail::message>
