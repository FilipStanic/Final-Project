import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { useCart } from './CartContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const [checkoutItems, setCheckoutItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { authToken } = useAuth();
    const { setCartItems } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCheckoutItems = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/cart/checkout', {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                });
                console.log('Checkout items response:', response.data);
                setCheckoutItems(response.data);
            } catch (err) {
                console.error('Error fetching checkout items:', err);
                setError(err.response ? err.response.data.message : 'Unknown error occurred');
            } finally {
                setLoading(false);
            }
        };
    
        fetchCheckoutItems();
    }, [authToken]);

    const handleClearAll = async () => {
        try {
            const response = await axios.delete('http://127.0.0.1:8000/api/cart', {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });

            if (response.status === 200) {
                setCartItems([]);
                localStorage.removeItem('cartItems');
                Swal.fire('Cleared!', 'Your cart has been cleared.', 'success');
                navigate('/products');
            } else {
                Swal.fire('Error', 'There was an error clearing your cart.', 'error');
            }
        } catch (error) {
            console.error('Error clearing cart:', error);
            Swal.fire('Error', 'There was an error clearing your cart.', 'error');
        }
    };

    const handleBuyNow = async () => {
        try {
            await axios.post('http://127.0.0.1:8000/api/cart/purchase', {}, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });

            Swal.fire('Success', 'Purchase completed successfully!', 'success');
            setCartItems([]);
            localStorage.removeItem('cartItems');
            navigate('/products');
        } catch (error) {
            console.error('Error processing purchase:', error);
            Swal.fire('Error', 'There was an error processing your purchase.', 'error');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Checkout Items</h1>
            {checkoutItems.length === 0 ? (
                <p>No items in checkout.</p>
            ) : (
                <>
                    <ul>
                        {checkoutItems.map((item, index) => (
                            <li key={index} className="flex items-center border-b border-gray-200 py-2">
                                {item.image_path && (
                                    <img
                                        src={`http://127.0.0.1:8000/storage/${item.image_path}`}
                                        alt={item.title}
                                        className="w-16 h-16 object-cover mr-4 rounded"
                                    />
                                )}
                                <div className="flex-grow">
                                    <h2 className="text-xl font-bold">{item.title}</h2>
                                    <p className="text-lg">Price: ${item.price}</p>
                                    <p className="text-lg">Quantity: {item.quantity}</p>
                                    <p className="text-lg font-semibold">Total: ${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-6 flex justify-between">
                        <button
                            onClick={handleClearAll}
                            className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded font-semibold"
                        >
                            Clear All
                        </button>
                        <button
                            onClick={handleBuyNow}
                            className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold"
                        >
                            Buy Now
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Checkout;
