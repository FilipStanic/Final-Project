import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UploadImg = () => {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        image: null,
        category_id: ''
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'file' ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('image', formData.image);
        data.append('category_id', formData.category_id);

        try {
            await axios.post('http://127.0.0.1:8000/api/products', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Product uploaded successfully!');
        } catch (error) {
            console.error('Error uploading product:', error);
        }
    };

    return (
        <div className="p-6 rounded-lg w-11/12 max-w-md mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">Create Photography Product</h1>

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
                    <small className="">Maximum 3 words, 100 characters</small>
                </div>

                <div className="mb-4">
                    <label className="block text font-bold mb-2">Description (optional):</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2 w-full text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <small className="">Maximum 100 characters</small>
                </div>

                <div className="mb-4">
                    <label className="block  font-bold mb-2">Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        className="border text-black border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter price"
                        step="0.01"
                    />
                </div>

                <div className="mb-4">
                    <label className="block  font-bold mb-2">Image:</label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleChange}
                        required
                        className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
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

                <button
                    type="submit"
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default UploadImg;
