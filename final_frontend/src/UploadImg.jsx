import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UploadImg = () => {
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        image: null,
        category_id: ''
    });
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategoriesAndTags = async () => {
            try {
                const categoryResponse = await axios.get('http://127.0.0.1:8000/api/categories');
                setCategories(categoryResponse.data);

                if (formData.category_id) {
                    const tagResponse = await axios.get(`http://127.0.0.1:8000/api/categories/${formData.category_id}/tags`);
                    setTags(tagResponse.data);
                }
            } catch (error) {
                console.error('Error fetching categories or tags:', error);
            }
        };

        fetchCategoriesAndTags();
    }, [formData.category_id]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'file' ? files[0] : value
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

        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('image', formData.image);
        data.append('category_id', formData.category_id);

        selectedTags.forEach(tag => {
            data.append('tags[]', tag);
        });

        try {
            await axios.post('http://127.0.0.1:8000/api/products', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            });

            navigate('/products');
        } catch (error) {
            console.error('Error uploading product:', error);

            if (error.response && error.response.data && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                setErrors({ general: 'An unknown error occurred while creating the product.' });
            }
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
                        className={`border text-black border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.title ? 'border-red-500' : ''}`}
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title[0]}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text font-bold mb-2">Description (optional):</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className={`border border-gray-300 rounded-md p-2 w-full text-black focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.description ? 'border-red-500' : ''}`}
                    />
                    {errors.description && <p className="text-red-500 text-sm">{errors.description[0]}</p>}
                </div>

                <div className="mb-4">
                    <label className="block  font-bold mb-2">Price (USD):</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        className={`border text-black border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.price ? 'border-red-500' : ''}`}
                    />
                    {errors.price && <p className="text-red-500 text-sm">{errors.price[0]}</p>}
                </div>

                <div className="mb-4">
                    <label className="block  font-bold mb-2">Image:</label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleChange}
                        required
                        className={`border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.image ? 'border-red-500' : ''}`}
                    />
                    {errors.image && <p className="text-red-500 text-sm">{errors.image[0]}</p>}
                </div>

                <div className="mb-4">
                    <label className="block font-bold mb-2">Category:</label>
                    <select
                        name="category_id"
                        value={formData.category_id}
                        onChange={handleChange}
                        required
                        className={`border border-gray-300 rounded-md text-black p-2 w-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.category_id ? 'border-red-500' : ''}`}
                    >
                        <option value="">Select a Category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                            </option>
                        ))}
                    </select>
                    {errors.category_id && <p className="text-red-500 text-sm">{errors.category_id[0]}</p>}
                </div>

                <div className="mb-4">
                    <label className="block font-bold mb-2">Tags:</label>
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <button
                                key={tag.id}
                                type="button"
                                onClick={() => handleTagSelection(tag.id)}
                                className={`px-3 py-1 rounded-full border ${selectedTags.includes(tag.id) ? 'bg-gray-200 text-gray-900 border-gray-400' : 'bg-gray-100 text-gray-700 border-gray-300'
                                    } transition-all duration-200 ease-in-out transform ${selectedTags.includes(tag.id) ? 'scale-105' : 'scale-100'
                                    }`}
                            >
                                {tag.name}
                                {selectedTags.includes(tag.id) && (
                                    <span className="ml-2 text-gray-500">✕</span>
                                )}
                            </button>
                        ))}
                    </div>
                    {errors.tags && <p className="text-red-500 text-sm">{errors.tags[0]}</p>}
                </div>

                {errors.general && <p className="text-red-500 text-sm text-center mb-4">{errors.general}</p>}

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
