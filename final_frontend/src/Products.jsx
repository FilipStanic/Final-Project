import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [allTags, setAllTags] = useState([]);
    const [filteredTags, setFilteredTags] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [displayedProducts, setDisplayedProducts] = useState(20);
    const [isSecondAsideOpen, setIsSecondAsideOpen] = useState(false);

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

        const fetchTags = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/tags');
                setAllTags(response.data);
                setFilteredTags(response.data); // Set all tags initially
            } catch (error) {
                console.error('Error fetching tags:', error);
            }
        };

        fetchProducts();
        fetchCategories();
        fetchTags();
    }, []);

    useEffect(() => {
        // Fetch and filter tags based on selected category
        const fetchFilteredTags = async () => {
            if (selectedCategory) {
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/api/categories/${selectedCategory}/tags`);
                    setFilteredTags(response.data);
                } catch (error) {
                    console.error('Error fetching filtered tags:', error);
                }
            } else {
                setFilteredTags(allTags); // Show all tags when no category is selected
            }
        };

        fetchFilteredTags();
    }, [selectedCategory, allTags]);

    const toggleLike = (id) => {
        setProducts(products.map(product =>
            product.id === id ? { ...product, liked: !product.liked } : product
        ));
    };

    const handleTagSelection = (tagId) => {
        setSelectedTags(prevTags =>
            prevTags.includes(tagId)
                ? prevTags.filter(tag => tag !== tagId)
                : [...prevTags, tagId]
        );
    };

    const filteredProducts = products.filter(product => {
        const productTags = product.tags || [];
        const categoryMatch = selectedCategory === '' || product.category_id === parseInt(selectedCategory);
        const searchTermMatch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
        const tagMatch = selectedTags.length === 0 || selectedTags.every(tagId => {
            return productTags.some(tag => tag.id === parseInt(tagId));
        });

        return categoryMatch && searchTermMatch && tagMatch;
    });

    const visibleProducts = filteredProducts.slice(0, displayedProducts);

    const handleShowMore = () => {
        setDisplayedProducts(prev => prev + 20);
    };

    const toggleSecondAside = () => {
        setIsSecondAsideOpen(!isSecondAsideOpen);
    };

    return (
        <div className="flex p-4">
            <div className='w-14 p-4 -ml-4 -mt-4 -mb-4 bg-white bg-opacity-40 flex flex-col items-center'>
                <aside className="flex-none h-screen">
                    <nav className="space-y-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`icon icon-tabler icon-tabler-adjustments cursor-pointer ${isSecondAsideOpen ? 'bg-gray-700 text-white  rounded' : 'text-black'}`}
                            width="32"
                            height="40"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            onClick={toggleSecondAside}
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M4 10a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                            <path d="M6 4v4" />
                            <path d="M6 12v8" />
                            <path d="M10 16a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                            <path d="M12 4v10" />
                            <path d="M12 18v2" />
                            <path d="M16 7a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                            <path d="M18 4v1" />
                            <path d="M18 9v11" />
                        </svg>
                    </nav>
                </aside>
            </div>
            {isSecondAsideOpen && (
                <div className='overflow-auto bg-white bg-opacity-80 border border-gray-200 flex flex-col items-center -mt-4 -mb-4 p-4 w-60'>
                    <aside className="flex-none h-screen">
                        <nav className="space-y-4">
                            <h3 className="text-lg font-bold mb-4">Filter by Tags</h3>
                            <div className="space-y-2 space-x-1">
                                {filteredTags.map(tag => (
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
                        </nav>
                    </aside>
                </div>
            )}
            <div className="flex-1 p-5 md:p-10">
                <div className="flex justify-between mb-4 items-center">
                    <div className="category-buttons">
                        <button
                            className={`category-button ${selectedCategory === '' ? 'active' : ''}`}
                            onClick={() => setSelectedCategory('')}
                        >
                            All Categories
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                className={`category-button ${selectedCategory === category.id.toString() ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(category.id.toString())}
                            >
                                {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full max-w-xs">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                                <path d="M21 21l-6 -6" />
                            </svg>
                        </div>
                    </div>
                </div>

                {visibleProducts.length === 0 ? (
                    <p className="text-center">No products available in this category.</p>
                ) : (
                    <div className="columns-1 gap-2 lg:gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
                        {visibleProducts.map((product) => (
                            <div key={product.id} className="relative mb-5 break-inside-avoid group">
                                {product.image_path ? (
                                    <Link to={`/image/${product.image_path}`}>
                                        <img
                                            src={`http://127.0.0.1:8000/storage/${product.image_path}`}
                                            alt={product.title}
                                            className="w-full h-auto opacity-100 group-hover:opacity-80 transition-opacity duration-300"
                                        />
                                    </Link>
                                ) : (
                                    <p className="text-red-500 text-center">No Image Available</p>
                                )}
                                <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black p-2">
                                    <div className="text-white ml-4 text-lg">{product.title}</div>

                                    <button onClick={() => toggleLike(product.id)} className="focus:outline-none">
                                        {product.liked ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-heart-filled" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="currentColor" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z" strokeWidth="0" fill="currentColor" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-heart" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {visibleProducts.length < filteredProducts.length && (
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={handleShowMore}
                            className="bg-white border text-[#093a74] font-bold py-2 px-4 rounded-full text-md"
                        >
                            Show More
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;
