import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext'; // Import the useAuth hook

const Checkout = () => {
    const { user, authToken } = useAuth(); // Destructure user and authToken from context
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            if (!user || !authToken) return; // Ensure user and authToken are available

            try {
                const response = await fetch(`http://127.0.0.1:8000/api/cart?user_id=${user.id}`, {
                    headers: {
                        'Authorization': `Bearer ${authToken}` // Pass the auth token in the request header
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setItems(data);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, [user, authToken]); // Add user and authToken as dependencies

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="flex items-center space-x-3 mb-4">
                <button
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded font-semibold text-lg"
                >
                    Buy Now
                </button>
                <button
                    className="bg-red-500 hover:bg-red-600 p-2 rounded-full flex items-center justify-center"
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
            {/* Render cart items */}
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
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
};

export default Checkout;
