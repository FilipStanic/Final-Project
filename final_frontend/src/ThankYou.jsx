import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { saveAs } from 'file-saver';

const ThankYou = ({ orderId }) => {
    const [purchasedItems, setPurchasedItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { authToken } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPurchasedItems = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/cart/purchased-items/${orderId}`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                setPurchasedItems(response.data);
            } catch (err) {
                console.error('Error fetching purchased items:', err);
                setError(err.response ? err.response.data.message : 'Unknown error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchPurchasedItems();
    }, [authToken, orderId]);

    const handleDownloadImage = (imagePath, title) => {
        axios({
            url: `http://127.0.0.1:8000/storage/${imagePath}`,
            method: 'GET',
            responseType: 'blob', // Important
        }).then((response) => {
            const file = new Blob([response.data], { type: 'image/jpeg' }); // Adjust MIME type if needed
            saveAs(file, `${title}.jpg`);
        });
    };

    const handleContinueBrowsing = () => {
        navigate('/products');
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-6">Thank You for Your Purchase!</h1>
            <p>Your products have been sent to your email.</p>
            {purchasedItems.length > 0 && (
                <>
                    <h2 className="text-2xl font-bold mt-4">Your Purchased Items:</h2>
                    <ul>
                        {purchasedItems.map((item) => (
                            <li key={item.id} className="flex items-center border-b border-gray-200 py-2">
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
                                    <p className="text-lg font-semibold">
                                        Total: ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                    <button
                                        onClick={() => handleDownloadImage(item.image_path, item.title)}
                                        className="text-blue-500 hover:underline mt-2"
                                    >
                                        Download Image
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-8">
                        <button
                            onClick={handleContinueBrowsing}
                            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold"
                        >
                            Continue Browsing
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default ThankYou;
