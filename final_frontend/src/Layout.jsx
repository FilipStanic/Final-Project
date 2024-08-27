import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useCart } from './CartContext';

const Layout = ({ children }) => {
    const { user, authToken, logout } = useAuth();
    const { cartItems } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen flex flex-col">
            <header className="flex-none p-4 flex justify-between items-center border-b-black shadow-lg z-20 relative bg-gradient-to-r from-[#4c8cd1] via-[#5484c4] to-[#5c9add]">

                <div className="flex items-center space-x-4">
                    <Link to="/">
                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
                            <g fill="none" stroke="#ffffff" strokeWidth="3">
                                <circle cx="22" cy="32" r="18" />
                                <circle cx="42" cy="32" r="18" />
                                <line x1="27" y1="26" x2="37" y2="26" />
                                <line x1="25" y1="32" x2="39" y2="32" />
                                <line x1="27" y1="38" x2="37" y2="38" />
                            </g>
                        </svg>
                    </Link>
                    <Link to="/products">
                        <button className='bg-white text-black'>Products</button>
                    </Link>
                    <Link to="/about">
                        <button className='bg-white text-black'>About Us</button>
                    </Link>
                    <Link to="/contact">
                        <button className='bg-white text-black'>Contact Us</button>
                    </Link>
                </div>
                <div className="flex items-center space-x-4">
                    {authToken ? (
                        <>
                            <div className="relative inline-block group">
                                <button className="bg-white rounded-full font-extrabold text-[#093a74] px-4 py-2">
                                    Welcome, {user ? user.name : ''}
                                </button>
                                <div className="absolute right-0 mt-1 min-w-[160px] rounded-lg bg-[#093a74] shadow-lg opacity-0 invisible transition-all ease-out duration-100 group-hover:opacity-100 group-hover:visible group-hover:duration-1000 group-hover:delay-75 z-30">
                                    <Link to="/profile" className="block px-4 py-2 text-white hover:bg-[#3166b4] rounded-lg">
                                        My Profile
                                    </Link>
                                    <button className="block w-full text-left px-4 py-2 text-white bg-[#ff2626] rounded-lg" onClick={handleLogout}>
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
                            <Link to="/login" className="text-white text-md font-medium">
                                Log In
                            </Link>
                            <Link to="/register" className="bg-orange-500 hover:bg-orange-700 text-white px-5 py-2 rounded-full text-l font-bold">
                                Register
                            </Link>
                        </div>
                    )}
                    <div className="relative">
                        <Link to="/cart">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" strokeWidth="1.9" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24H0z" fill="none" />
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

            <div className="flex flex-1">
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
