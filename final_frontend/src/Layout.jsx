import React from 'react';
import { Link } from 'react-router-dom';
import logo from './assets/echoes-logo.svg';

const Layout = ({ children }) => {
    return (
        <div className="bg-gray-800 min-h-screen flex flex-col">
            <header className="bg-gray-900 p-4 text-center">
                <Link to="/">
                    <img src={logo} alt="Logo" className="h-12 mx-auto" />
                </Link>
            </header>
            <main className="flex-grow p-4">
                {children}
            </main>
        </div>
    );
};

export default Layout;
