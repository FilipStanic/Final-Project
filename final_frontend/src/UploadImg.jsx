import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

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

    const handleTagSelection = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSelectedTags([...selectedTags, value]);
        } else {
            setSelectedTags(selectedTags.filter((tag) => tag !== value));
        }
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
            const response = await axios.post('http://127.0.0.1:8000/api/products', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            });
    
            console.log('Product created:', response.data);
    
            Swal.fire({
                title: 'Success!',
                text: 'Product was created successfully!',
                icon: 'success',
                confirmButtonText: 'OK',
            }).then(() => {
                navigate('/products');
            });
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
                </div>

                <div className="mb-4">
                    <label className="block text font-bold mb-2">Description (optional):</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2 w-full text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block  font-bold mb-2">Price (USD):</label>
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

                <div className="mb-4">
                    <label className="block font-bold mb-2">Tags:</label>
                    {tags.map((tag) => (
                        <div key={tag.id} className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                value={tag.id}
                                onChange={handleTagSelection}
                                className="mr-2"
                            />
                            <label className="text-black">{tag.name}</label>
                        </div>
                    ))}
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
