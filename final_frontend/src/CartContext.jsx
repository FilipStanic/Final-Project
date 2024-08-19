import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = async (product) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(item => item.title === product.title);
            if (existingItem) {
                return prevItems.map(item => 
                    item.title === product.title 
                    ? { ...item, quantity: item.quantity + 1 } 
                    : item
                );
            } else {
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    
        await axios.post('http://127.0.0.1:8000/api/cart/update', {
            items: cartItems
        });
    };
    

    return (
        <CartContext.Provider value={{ cartItems, setCartItems, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};