import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ThankYou = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { orderId } = useParams();
    const navigate = useNavigate();
    const { authToken } = useAuth();

    useEffect(() => {
        const fetchPurchasedItems = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/cart/purchased-items/${orderId}`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                });
    
                if (Array.isArray(response.data)) {
                    setItems(response.data);
                } else {
                    setError('Unexpected response format');
                }
            } catch (error) {
                setError('Error fetching purchased items.');
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchPurchasedItems();
    }, [orderId, authToken]); 
    
    if (loading) return <p className="text-gray-500">Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-center text-green-600">Thank You for Your Purchase!</h1>

            {items.length > 0 ? (
                <ul className="space-y-4">
                    {items.map((item) => (
                        <li key={item.id} className="flex items-center border-b border-gray-200 pb-4">
                            <img
                                src={`http://127.0.0.1:8000/storage/${item.image_path}`}
                                alt={item.title}
                                className="w-20 h-20 object-cover mr-4 rounded-lg shadow-sm"
                            />
                            <div className="flex-1">
                                <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
                                <p className="text-md text-gray-600 mt-1">Price: <span className="font-medium">${item.price}</span></p>
                                <p className="text-md text-gray-600 mt-1">Quantity: <span className="font-medium">{item.quantity}</span></p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-600 text-md text-center">No items found for this order.</p>
            )}

            <div className="mt-8 flex justify-center">
                <button
                    onClick={() => navigate('/')}
                    className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium mr-4"
                >
                    Home
                </button>
                <button
                    onClick={() => navigate('/products')}
                    className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium"
                >
                    Products
                </button>
            </div>
        </div>
    );
};

export default ThankYou;
