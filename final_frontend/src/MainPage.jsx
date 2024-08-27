import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from './assets/echowp.jpg'; 

const MainPage = () => {
    return (
        <>
            <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})`, opacity: 0.8 }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 font-serif">Welcome to Echoes</h1>
                    <p className="text-lg md:text-2xl mb-8">Discover amazing content and explore our features.</p>
                    <Link to="/products" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300">
                        Explore
                    </Link>
                </div>
            </div>

            <section className="py-12 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-semibold text-center mb-8">Our Features</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-6 bg-white rounded-lg shadow-lg text-center">
                            <h3 className="text-2xl font-bold mb-4">Feature 1</h3>
                            <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis.</p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-lg text-center">
                            <h3 className="text-2xl font-bold mb-4">Feature 2</h3>
                            <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis.</p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-lg text-center">
                            <h3 className="text-2xl font-bold mb-4">Feature 3</h3>
                            <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-6 bg-[#093a74] text-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-semibold text-center mb-3">Join Us</h2>
                    <div className="flex justify-center">
                        <Link to="/register" className="bg-white text-[#093a74] font-bold py-3 px-8 rounded-full text-md transition duration-300 hover:bg-gray-100">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </section>

            <footer className="py-6 bg-black text-white text-center">
                <p>&copy; 2024 Echoes. All rights reserved.</p>
                <div className="mt-4">
                    <Link to="/privacy" className="hover:underline mx-2">Privacy Policy</Link>
                    <Link to="/terms" className="hover:underline mx-2">Terms of Service</Link>
                </div>
            </footer>
        </>
    );
};

export default MainPage;
