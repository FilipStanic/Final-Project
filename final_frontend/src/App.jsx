import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Products from './Products';
import ImageDetail from './ImageDetail';
import Cart from './Cart';
import Profile from './Profile';
import { CartProvider } from './CartContext';
import { AuthProvider } from './AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Login';
import Register from './Register';
import RegistrationSuccess from './RegistrationSuccess';
import Checkout from './Checkout';
import UploadImg from './UploadImg';
import MainPage from './MainPage';

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <CartProvider>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<MainPage />} />
                            <Route path="/products" element={<Products />} />
                            <Route path="/image/*" element={<ImageDetail />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/success" element={<RegistrationSuccess />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/checkout" element={<Checkout />} />
                            <Route path="/upload" element={<UploadImg />} />
                        </Routes>
                        <ToastContainer />
                    </Layout>
                </CartProvider>
            </AuthProvider>
        </Router>
    );
};

export default App;
