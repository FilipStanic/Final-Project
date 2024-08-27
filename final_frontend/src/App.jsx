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
import EditProduct from './EditProduct';
import About from './About'
import ContactUs from './ContactUs'
import VerificationSuccess from './VerificationSuccess';
import EmailVerification from './EmailVerification';


const App = () => {
    return (
        <Router>
            <CartProvider>
                <AuthProvider>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<MainPage />} />
                            <Route path="/products" element={<Products />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<ContactUs />} />
                            <Route path="/image/*" element={<ImageDetail />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/success" element={<RegistrationSuccess />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/checkout" element={<Checkout />} />
                            <Route path="/upload" element={<UploadImg />} />
                            <Route path="/edit-product/:id" element={<EditProduct />} />
                            <Route path="/email-verification" element={<EmailVerification />} />
                            <Route path="/verification-success" element={<VerificationSuccess />} />
                        </Routes>
                        <ToastContainer />
                    </Layout>
                </AuthProvider>
            </CartProvider>
        </Router>
    );
};

export default App;
