import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useCart } from './CartContext';
import logo from './assets/echoes-logo.svg';

const Layout = ({ children }) => {
    const { user, authToken, logout } = useAuth();
    const { cartItems } = useCart();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col">
            <header className="p-4 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <Link to="/">
                        <img src={logo} alt="Logo" className="h-10" />
                    </Link>
                </div>
                <div className="flex items-center space-x-4">
                    {authToken ? (
                        <>
                            <div className="profile-dropdown bg-[#093a74] rounded-full relative">
                                <button>
                                    Welcome, {user ? user.name : ''}
                                </button>
                                <div className="profile-dropdown-content absolute right-0 shadow-lg rounded-md mt-2 py-2">
                                    <Link to="/profile" className="block px-4 py-2">My Profile</Link>
                                    <button className="block w-full text-left px-4 py-2 logout-btn" onClick={logout}>
                                        Logout
                                    </button>
                                </div>
                            </div>
                            <button
                                className="bg-[#6dad63] text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2"
                                onClick={() => navigate('/upload')}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
                                    <path d="M7 9l5 -5l5 5" />
                                    <path d="M12 4l0 12" />
                                </svg>
                                <span>Upload Image</span>
                            </button>
                        </>
                    ) : (
                        <div className="flex space-x-4 items-center justify-center text-center">
                            <Link to="/login" className="text-[#093a74] text-md font-medium">
                                Log In
                            </Link>
                            <Link to="/register" className="bg-orange-500 hover:bg-orange-700 text-white px-5 py-3 rounded-full text-l font-bold">
                                Register
                            </Link>
                        </div>
                    )}
                    <div className="relative">
                        <Link to="/cart">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" strokeWidth="1.9" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
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

            <main className="main-content flex-grow p-4">
                {children}
            </main>

            <footer className="p-4 text-center text-sm text-[#093a74]">
                &copy; 2024 Echoes. All rights reserved.
            </footer>
        </div>
    );
};

export default Layout;
