import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from './CartContext';
import { toast } from 'react-toastify';

const ImageDetail = () => {
    const { '*': imagePath } = useParams();
    const [imageUrl, setImageUrl] = useState('');
    const [product, setProduct] = useState(null);
    const [categories, setCategories] = useState([]);
    const { addToCart } = useCart();
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesResponse = await axios.get('http://127.0.0.1:8000/api/categories', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setCategories(categoriesResponse.data);

                if (imagePath) {
                    setImageUrl(`http://127.0.0.1:8000/storage/${imagePath}`);
                    const response = await axios.get(`http://127.0.0.1:8000/api/products`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    const filteredProduct = response.data.find(item => item.image_path === imagePath);
                    setProduct(filteredProduct);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [imagePath, token]);

    const handleAddToCart = (product) => {
        addToCart(product);
        toast.success(`${product.title} added to cart!`, { autoClose: 1000 });
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-center h-screen">
            <div className="flex justify-center w-full md:w-1/2 p-4">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt="Detail"
                        className="max-w-full max-h-screen object-contain"
                    />
                ) : (
                    <p>Loading image...</p>
                )}
            </div>
            <div className="flex flex-col items-center text-center justify-center w-full md:w-1/2 p-4">
                {product ? (
                    <div className=" text-[#093a74] px-8 py-4 rounded-lg w-full max-w-lg">
                            <p className="text-xl font-semibold mb-2">${product.price}</p>
                        <h1 className="text-7xl font-bold font-serif mb-2 ">{product.title}</h1>
                        <p className="mb-4 text-xl italic break-words">{product.description}</p>
                        <div>
                            {/* <p className='font-bold'>Category: <span className="text-[#093a74]">{product.category_id ? categories.find(cat => cat.id === product.category_id)?.name.charAt(0).toUpperCase() + categories.find(cat => cat.id === product.category_id)?.name.slice(1) : 'N/A'}</span></p> */}
                            <button
                                onClick={() => handleAddToCart(product)}
                                className="bg-[#6dad63] w-full px-6 py-3 rounded hover:bg-[#539748] mb-2 mt-4"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ) : (
                    <p>No product details found.</p>
                )}
            </div>
        </div>
    );
};

export default ImageDetail;
