import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Products from './Products';
import ImageDetail from './ImageDetail';
import Cart from './Cart';
import { CartProvider } from './CartContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    return (
        <Router>
            <CartProvider>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Products />} />
                        <Route path="/image/*" element={<ImageDetail />} />
                        <Route path="/cart" element={<Cart />} />
                    </Routes>
                    <ToastContainer />
                </Layout>
            </CartProvider>
        </Router>
    );
};

export default App;
