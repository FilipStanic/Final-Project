import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditProduct = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        category_id: '',
        tags: [],
    });
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [imagePath, setImagePath] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/products/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const product = response.data;
                setFormData({
                    title: product.title,
                    description: product.description,
                    price: product.price,
                    category_id: product.category_id,
                    tags: product.tags.map(tag => tag.id),
                });
                setSelectedTags(product.tags.map(tag => tag.id));
                setImagePath(product.image_path);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        const fetchCategories = async () => {
            try {
                const categoryResponse = await axios.get('http://127.0.0.1:8000/api/categories');
                setCategories(categoryResponse.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchProduct();
        fetchCategories();
    }, [id, token]);

    useEffect(() => {
        const fetchTags = async () => {
            if (formData.category_id) {
                try {
                    const tagResponse = await axios.get(`http://127.0.0.1:8000/api/categories/${formData.category_id}/tags`);
                    setTags(tagResponse.data);
                    setSelectedTags([]); // Clear selected tags when category changes
                } catch (error) {
                    console.error('Error fetching tags:', error);
                }
            }
        };

        fetchTags();
    }, [formData.category_id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleTagSelection = (tagId) => {
        setSelectedTags(prevTags =>
            prevTags.includes(tagId)
                ? prevTags.filter(tag => tag !== tagId)
                : [...prevTags, tagId]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            ...formData,
            tags: selectedTags
        };

        try {
            await axios.put(`http://127.0.0.1:8000/api/products/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            Swal.fire({
                title: 'Success!',
                text: 'Product updated successfully!',
                icon: 'success',
                confirmButtonText: 'OK',
            }).then(() => {
                navigate('/profile');
            });
        } catch (error) {
            console.error('Error updating product:', error);
            Swal.fire({
                title: 'Error!',
                text: error.response?.data?.message || 'There was an error updating the product.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6 p-6 rounded-lg shadow-lg bg-white max-w-4xl w-full">
                <div className="md:w-1/3 w-full flex justify-center">
                    {imagePath && (
                        <img
                            src={`http://127.0.0.1:8000/storage/${imagePath}`}
                            alt="Product"
                            className="w-full h-auto rounded-lg shadow-md"
                        />
                    )}
                </div>
                <div className="md:w-2/3 w-full">
                    <h1 className="text-3xl font-bold mb-6 text-center">Edit Product</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="mb-4">
                            <label className="block font-bold mb-2">Title:</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="border text-black border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text font-bold mb-2">Description:</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                className="border text-black border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-bold mb-2">Price (USD):</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                className="border text-black border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-bold mb-2">Category:</label>
                            <select
                                name="category_id"
                                value={formData.category_id}
                                onChange={handleChange}
                                required
                                className="border border-gray-300 rounded-md text-black p-2 w-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select a Category</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block font-bold mb-2">Tags:</label>
                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag) => (
                                    <button
                                        key={tag.id}
                                        type="button"
                                        onClick={() => handleTagSelection(tag.id)}
                                        className={`px-3 py-1 rounded-full border ${selectedTags.includes(tag.id) ? 'bg-gray-600 text-white border-gray-400' : 'bg-gray-400 text-white border-gray-300'}`}
                                    >
                                        {tag.name}
                                        {selectedTags.includes(tag.id) && (
                                            <span className="ml-2 text-gray-500">✕</span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                        >
                            Update Product
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;
