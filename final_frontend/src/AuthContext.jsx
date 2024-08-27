import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useCart } from './CartContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || '');
    const [user, setUser] = useState(null);
    const { setCartItems } = useCart();

    useEffect(() => {
        if (authToken) {
            const fetchUser = async () => {
                try {
                    const response = await axios.get('http://127.0.0.1:8000/api/user', {
                        headers: { Authorization: `Bearer ${authToken}` }
                    });
                    setUser(response.data);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    setAuthToken('');
                    localStorage.removeItem('authToken');
                    setUser(null);
                }
            };

            fetchUser();
        } else {
            setUser(null);
        }
    }, [authToken]);

    const login = (token) => {
        setAuthToken(token);
        localStorage.setItem('authToken', token);
    };

    const logout = async () => {
        try {
            await axios.delete('http://127.0.0.1:8000/api/cart', {
                headers: { Authorization: `Bearer ${authToken}` }
            });
        } catch (error) {
            console.error('Error clearing cart from the database:', error);
        }

        setCartItems([]);
        localStorage.removeItem('cartItems');

        setAuthToken('');
        localStorage.removeItem('authToken');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ authToken, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
