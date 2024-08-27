import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const token = localStorage.getItem('authToken');

    const addToCart = async (product) => {
        const updatedItems = cartItems.map(item => 
            item.title === product.title 
                ? { ...item, quantity: item.quantity + 1 } 
                : item
        );

        if (!updatedItems.some(item => item.title === product.title)) {
            updatedItems.push({ ...product, quantity: 1 });
        }

        const payload = updatedItems.map(item => ({
            product_id: item.id,
            quantity: item.quantity
        }));

        setCartItems(updatedItems);

        try {
            await axios.post('http://127.0.0.1:8000/api/cart/update', {
                items: payload
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

        } catch (error) {
            console.error('Error updating cart:', error);
            Swal.fire('Error', 'There was an error updating your cart.', 'error');
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, setCartItems, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};
