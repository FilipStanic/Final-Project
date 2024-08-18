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
        <div className="bg-gray-800 min-h-screen flex flex-col text-white">
            <header className="bg-gray-900 p-4 flex justify-between items-center relative">
                <div className="flex items-center space-x-4">
                    <Link to="/">
                        <img src={logo} alt="Logo" className="h-12" />
                    </Link>
                </div>
                <div className='flex'>
                    <button
                        className="bg-white text-black border border-white px-4 py-2 rounded-full text-lg font-semibold hover:bg-gray-200 flex items-center space-x-2"
                        onClick={() => navigate('/upload')}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-upload" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
                            <path d="M7 9l5 -5l5 5" />
                            <path d="M12 4l0 12" />
                        </svg>
                        <span>Upload File</span>
                    </button>

                </div>
                <div className="flex items-center space-x-4">
                    {authToken ? (
                        <div className="flex items-center space-x-4">
                            <div className="text-white text-lg font-semibold">
                                Welcome, {user ? user.name : 'User'}
                            </div>
                            <Link to="/profile">
                                <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-3xl">
                                    My Profile
                                </button>
                            </Link>
                            <Logout />
                        </div>
                    ) : (
                        <div className="flex items-center space-x-4">
                            <Link to="/login">
                                <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-3xl">
                                    Log In
                                </button>
                            </Link>
                            <Link to="/register">
                                <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-3xl">
                                    Register
                                </button>
                            </Link>
                        </div>
                    )}
                    <div className="relative">
                        <Link to="/cart">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-shopping-cart h-8 w-8" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
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

            <main className="p-4">
                {children}
            </main>
        </div>
    );
};

export default Layout;
