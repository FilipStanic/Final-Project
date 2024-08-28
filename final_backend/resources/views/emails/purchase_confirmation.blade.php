<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Purchase Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
        }
        .email-container {
            background-color: #ffffff;
            margin: 20px auto;
            padding: 20px;
            max-width: 600px;
            border-radius: 8px;
            box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333333;
            font-size: 24px;
            margin-bottom: 20px;
        }
        p {
            color: #555555;
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 20px;
        }
        ul {
            list-style-type: none;
            padding: 0;
        }
        ul li {
            background-color: #f9f9f9;
            margin-bottom: 10px;
            padding: 10px;
            border-radius: 5px;
            border: 1px solid #dddddd;
            color: #333333;
        }
        ul li span {
            font-weight: bold;
        }
    </style>
</head>
<body>
<div class="email-container">
    <h1>Thank you for your purchase, {{ $user->name }}!</h1>
    <p>Here are the details of your purchase:</p>
    <ul>
        @foreach ($cartItems as $item)
            <li>
                <span>{{ $item->title }}</span> - Quantity: {{ $item->quantity }} - Price: ${{ $item->price }}
            </li>
        @endforeach
    </ul>
    <p>Your items will be delivered to you soon.</p>
</div>
</body>
</html>
