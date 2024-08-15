import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchProducts();
        fetchCategories();
    }, []);

    const filteredProducts = selectedCategory 
        ? products.filter(product => product.category_id === parseInt(selectedCategory))
        : products;

    return (
        <div className="p-5 md:p-10">
            <div className="mb-4">
                <label htmlFor="category" className="mr-2">Filter by Category:</label>
                <select
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border rounded px-2 py-1 text-black"
                >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                        </option>
                    ))}
                </select>
            </div>

            {filteredProducts.length === 0 ? (
                <p className="text-center">No products available in this category.</p>
            ) : (
                <div className="columns-1 gap-2 lg:gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="mb-5 break-inside-avoid">
                            {product.image_path ? (
                                <Link to={`/image/${product.image_path}`}>
                                    <img
                                        src={`http://127.0.0.1:8000/storage/${product.image_path}`}
                                        alt={product.title}
                                        className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
                                    />
                                </Link>
                            ) : (
                                <p className="text-red-500 text-center">No Image Available</p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Products;
