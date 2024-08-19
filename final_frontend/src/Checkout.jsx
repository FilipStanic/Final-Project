import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const Checkout = () => {
    const { user, authToken } = useAuth();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCartItems = async () => {
        if (!user || !authToken) return;

        try {
            const response = await fetch('http://127.0.0.1:8000/api/cart', {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch cart items.');
            }

            const data = await response.json();
            setItems(data.cart_items || []); // Ensure items is always an array
        } catch (error) {
            setError(error.message);
            console.error('Error fetching cart items:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, [user, authToken]);

    const handleBuyNow = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/checkout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ items }),
            });

            if (!response.ok) {
                throw new Error('Failed to proceed to checkout.');
            }

            const result = await response.json();
            alert('Checkout successful!');
            // Refetch cart items to update the state after checkout
            fetchCartItems();
        } catch (error) {
            console.error('Error during checkout:', error);
            setError('Failed to proceed to checkout.');
        }
    };

    const handleRemoveItem = async (itemId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/cart/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to remove item from cart.');
            }

            setItems(items.filter(item => item.id !== itemId));
        } catch (error) {
            console.error('Error removing item from cart:', error);
            setError('Failed to remove item from cart.');
        }
    };

    if (loading) {
        return <p>Loading cart items...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="flex items-center space-x-3 mb-4">
                <button
                    onClick={handleBuyNow}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded font-semibold text-lg"
                >
                    Buy Now
                </button>
            </div>
            {items.length > 0 ? (
                <ul className="w-full max-w-md">
                    {items.map((item) => (
                        <li key={item.id} className="flex items-center border-b py-2">
                            <img
                                src={`http://127.0.0.1:8000/storage/${item.product.image_path}`}
                                alt={item.product.title}
                                className="w-16 h-16 object-cover mr-4 rounded"
                            />
                            <div className="flex-grow flex justify-between items-center">
                                <div className="flex flex-col">
                                    <h2 className="text-xl font-bold">{item.product.title}</h2>
                                    <p className="text-lg">Price: ${item.product.price}</p>
                                    <div className="flex items-center mt-1">
                                        <button
                                            className="px-2 border border-gray-300 rounded focus:outline-none hover:bg-gray-200"
                                        >
                                            -
                                        </button>
                                        <span className="mx-2">{item.quantity}</span>
                                        <button
                                            className="px-2 border border-gray-300 rounded focus:outline-none hover:bg-gray-200"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleRemoveItem(item.id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="icon icon-tabler icon-tabler-trash"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="#ffffff"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M4 7l16 0" />
                                        <path d="M10 11l0 6" />
                                        <path d="M14 11l0 6" />
                                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                    </svg>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No items in the cart.</p>
            )}
        </div>
    );
};

export default Checkout;
