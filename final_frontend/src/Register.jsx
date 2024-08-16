import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        try {
            await axios.post('http://127.0.0.1:8000/api/register', { email, password });
        } catch (err) {
            setError('Registration failed.');
        }
    };

    return (
        <div className="p-5 md:p-10 flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Register</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border rounded px-4 py-2 w-full text-black"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="border rounded px-4 py-2 w-full text-black"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="confirm-password" className="block text-gray-700 font-bold mb-2">Confirm Password</label>
                    <input
                        type="password"
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="border rounded px-4 py-2 w-full text-black"
                    />
                </div>
                <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">
                    Register
                </button>
                <p className="mt-4 text-center">
                    Already have an account? <Link to="/login" className="text-blue-500">Login here</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
