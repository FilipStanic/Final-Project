<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Purchase Confirmation</title>
</head>
<body>
<h1>Thank you for your purchase, {{ $user->name }}!</h1>
<p>Here are the details of your purchase:</p>
<ul>
    @foreach ($cartItems as $item)
        <li>{{ $item->title }} - Quantity: {{ $item->quantity }} - Price: ${{ $item->price }}</li>
    @endforeach
</ul>
<p>Your items will be delivered to you soon.</p>
</body>
</html>
