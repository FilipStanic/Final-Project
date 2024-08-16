import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || '');
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (authToken) {
            axios.get('http://127.0.0.1:8000/api/user', {
                headers: { Authorization: `Bearer ${authToken}` }
            })
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error('Error fetching user data', error);
            });
        } else {
            setUser(null);
        }
    }, [authToken]);

    const login = (token) => {
        setAuthToken(token);
        localStorage.setItem('authToken', token);
    };

    const logout = () => {
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
