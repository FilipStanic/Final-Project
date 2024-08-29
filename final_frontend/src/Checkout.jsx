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
                setCheckoutItems(response.data);
            } catch (err) {
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
            Swal.fire('Error', 'There was an error clearing your cart.', 'error');
        }
    };

    const handleBuyNow = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/cart/purchase', {}, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });

            const orderId = response.data.order_id;

            Swal.fire('Success', 'Purchase completed successfully!', 'success');
            setCartItems([]);
            localStorage.removeItem('cartItems');
            navigate(`/thank-you/${orderId}`);
        } catch (error) {
            Swal.fire('Error', 'There was an error processing your purchase.', 'error');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="p-6 text-[#6dad63] rounded-lg shadow-lg border-2 border-[#6dad63] max-w-3xl w-full">
                <h1 className="text-3xl font-bold mb-6">Checkout Items</h1>
                {checkoutItems.length === 0 ? (
                    <p className="text-xl text-gray-600">No items in checkout.</p>
                ) : (
                    <>
                        <ul className="space-y-4">
                            {checkoutItems.map((item, index) => (
                                <li key={index} className="flex items-center border-b border-[#6dad63]/40 py-4">
                                    {item.image_path && (
                                        <img
                                            src={`http://127.0.0.1:8000/storage/${item.image_path}`}
                                            alt={item.title}
                                            className="w-20 h-20 object-cover mr-4 rounded shadow-sm"
                                        />
                                    )}
                                    <div className="flex-grow">
                                        <h2 className="text-xl font-semibold text-[#093a74]">{item.title}</h2>
                                        <p className="text-lg text-[#093a74] mt-1">Price: <span className="font-bold">${item.price}</span></p>
                                        <p className="text-lg text-[#093a74] mt-1">Quantity: <span className="font-bold">{item.quantity}</span></p>
                                        <p className="text-lg text-[#093a74] mt-1 font-semibold">Total: ${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-6 flex justify-between">
                            <button
                                onClick={handleClearAll}
                                className="bg-red-500 hover:bg-red-700 text-white px-6 py-2 rounded-md font-semibold"
                            >
                                Clear All
                            </button>
                            <button
                                onClick={handleBuyNow}
                                className="bg-[#093a74] hover:bg-[#6dad63] text-white px-6 py-2 rounded-md font-semibold"
                            >
                                Buy Now
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Checkout;
