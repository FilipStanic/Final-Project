import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Products from './Products';
import ImageDetail from './ImageDetail';

const App = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Products />} />
                    <Route path="/image/*" element={<ImageDetail />} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default App;
