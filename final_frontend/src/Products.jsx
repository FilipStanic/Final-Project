import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get('http://127.0.0.1:8000/api/products');
            // console.log(response.data);
            setProducts(response.data);
        };

        fetchProducts();
    }, []);

    return (
        <div className="p-5 md:p-10">
            <div className="columns-1 gap-2 lg:gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
                {products.map((product) => (
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
        </div>
    );
};

export default Products;
