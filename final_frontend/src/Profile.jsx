import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, logout, authToken } = useAuth();
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProducts = async () => {
            if (!authToken) {
                console.error('No authentication token found.');
                return;
            }

            try {
                const response = await axios.get('http://127.0.0.1:8000/api/user/products', {
                    headers: { Authorization: `Bearer ${authToken}` }
                });

                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching user products:', error);
            }
        };

        if (authToken) {
            fetchUserProducts();
        }
    }, [authToken, user]);

    const deleteUserAccount = async () => {
        try {
            if (!authToken) {
                throw new Error('No token found. Please log in.');
            }

            await axios.delete(`http://127.0.0.1:8000/api/user/${user.id}`, {
                headers: { Authorization: `Bearer ${authToken}` }
            });

            Swal.fire({
                title: 'Deleted!',
                text: 'Your account has been deleted.',
                icon: 'success',
                confirmButtonText: 'OK',
            }).then(() => {
                logout();
                navigate('/');
            });
        } catch (error) {
            console.error('Error deleting user account:', error);
            Swal.fire({
                title: 'Error!',
                text: error.response?.data?.message || 'There was an error deleting your account.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    const handleDeleteAccount = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteUserAccount();
            }
        });
    };

    return (
        <div className="max-w-7xl mx-auto mt-10 p-6 rounded-lg">
            <h1 className="text-4xl text-center font-bold mb-4 text-text-[#093a74]">My Profile</h1>
            {user ? (
                <div>
                    <div className="mb-6 text-center">
                        {user.role !== 'admin' && (
                            <button
                                className="mt-4 py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700"
                                onClick={handleDeleteAccount}
                            >
                                Delete Account
                            </button>
                        )}
                    </div>

                    <h2 className="text-xl font-semibold mb-4 text-[#093a74]'">Your Products</h2>

                    {products.length === 0 ? (
                        <p className="text-white">No products yet.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {products.map(product => (
                                <div key={product.id} className="bg-[#093a74] rounded overflow-hidden shadow-lg">
                                    {product.image_path ? (
                                        <img
                                            src={`http://127.0.0.1:8000/storage/${product.image_path}`}
                                            alt={product.title}
                                            className="w-full h-48 object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-48 bg-gray-600 flex items-center justify-center">
                                            <p className="text-red-500 text-center">No Image Available</p>
                                        </div>
                                    )}
                                    <div className="p-4">
                                        <h3 className="text-white text-xl font-bold border-b">{product.title}</h3>
                                        <p className="text-white text-sm italic mt-2">{product.description}</p>
                                        <p className="text-white font-bold mt-2">${product.price}</p>

                                        {user.role === 'admin' && (
                                            <p className="text-sm text-gray-300 mt-2">
                                                Created by: {product.user ? product.user.name : ''}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <p className="text-white">Loading profile...</p>
            )}
        </div>
    );
};

export default Profile;
