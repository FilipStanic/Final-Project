import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useCart } from './CartContext';
import logo from './assets/echoes-logo.svg';
import Logout from './Logout';

const Layout = ({ children }) => {
    const { user, authToken } = useAuth();
    const { cartItems } = useCart();
    const navigate = useNavigate();

    return (
        <div className="bg-gradient-to-r from-blue-100 via-pink-100 to-purple-100 min-h-screen flex flex-col font-sans text-gray-900">
            <header className="bg-purple-600 shadow-md p-4 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <Link to="/">
                        <img src={logo} alt="Logo" className="h-10 text-blue-100" />
                    </Link>
                    <nav className="hidden md:flex space-x-6">
                        <Link to="/profile" className="text-white hover:text-yellow-300">
                            My Profile
                        </Link>
                        <Link to="/about" className="text-white hover:text-yellow-300">
                            About Us
                        </Link>
                        <Link to="/contact" className="text-white hover:text-yellow-300">
                            Contact
                        </Link>
                    </nav>
                </div>
                <div className="flex items-center space-x-4">
                    <button
                        className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2"
                        onClick={() => navigate('/upload')}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
                            <path d="M7 9l5 -5l5 5" />
                            <path d="M12 4l0 12" />
                        </svg>
                        <span>Upload</span>
                    </button>
                    {authToken ? (
                        <div className="flex items-center space-x-4">
                            <div className="text-white text-sm font-medium">
                                Welcome, {user ? user.name : ''}
                            </div>
                            <Logout />
                        </div>
                    ) : (
                        <div className="flex items-center space-x-4">
                            <Link to="/login" className="text-white hover:text-yellow-300 text-sm font-medium">
                                Log In
                            </Link>
                            <Link to="/register" className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 px-4 py-2 rounded-full text-sm font-medium">
                                Register
                            </Link>
                        </div>
                    )}
                    <div className="relative">
                        <Link to="/cart">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-100 hover:text-yellow-300" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                                <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                                <path d="M17 17h-11v-14h-2" />
                                <path d="M6 5l14 1l-1 7h-13" />
                            </svg>
                            {cartItems.length > 0 && (
                                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                                    {cartItems.length}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </header>

            <main className="flex-grow p-4">
                {children}
            </main>

            <footer className="bg-purple-600 p-4 text-center text-sm text-white">
                &copy; 2024 Echoes. All rights reserved.
            </footer>
        </div>
    );
};

export default Layout;
