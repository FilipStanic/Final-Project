import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

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

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/products/${id}`, {
                headers: { Authorization: `Bearer ${authToken}` }
            });
            setProducts(products.filter(product => product.id !== id));
            Swal.fire('Deleted!', 'Product has been deleted.', 'success');
        } catch (error) {
            Swal.fire('Error!', 'There was an error deleting the product.', 'error');
        }
    };

    const handleDeleteProduct = (id) => {
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
                deleteProduct(id);
            }
        });
    };

    return (
        <div className="max-w-7xl mx-auto mt-10 p-6 rounded-lg">
            {user ? (
                <div>
                    <h1 className="text-4xl text-center font-bold mb-4 text-[#093a74]">My Profile</h1>
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

                    <h2 className="text-xl font-semibold mb-4 text-[#093a74]">Your Products</h2>

                    {products.length === 0 ? (
                        <p className="text-white">No products yet.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {products.map(product => (
                                <div key={product.id} className="relative bg-[#093a74] rounded overflow-hidden shadow-lg">
                                    <Link to={`/edit-product/${product.id}`} className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-pencil" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
                                            <path d="M13.5 6.5l4 4" />
                                        </svg>
                                    </Link>
                                    <button
                                        onClick={() => handleDeleteProduct(product.id)}
                                        className="absolute bottom-2 right-2 bg-red-500 text-white p-2 rounded-full"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M4 7l16 0" />
                                            <path d="M10 11l0 6" />
                                            <path d="M14 11l0 6" />
                                            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                        </svg>
                                    </button>
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
                <div className='flex flex-col items-center'>
                    <p className="text-[#093a74] text-center text-3xl">You are not logged in!</p>
                    <Link to="/login" className="text-white bg-[#093a74] p-3 mt-8 rounded-2xl text-md font-medium">
                        Log In
                    </Link>
                </div>

            )}
        </div>
    );
};

export default Profile;
