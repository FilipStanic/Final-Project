import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                email,
                password
            });
            const { token } = response.data;
            localStorage.setItem('authToken', token);
            login(token);
            navigate('/');
        } catch (error) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen w-full">
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <form onSubmit={handleLogin} className="bg-[#093a74] p-6 rounded-lg w-full max-w-md">
                <h1 className="text-2xl text-white font-bold mb-5 text-center">Login</h1>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-white mb-2 text-md">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded text-black text-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-white mb-2 text-md">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded text-black text-md"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4 text-md"
                >
                    Login
                </button>

                <p className='text-white mt-8 text-center text-md'>
                    Don't have an account?
                    <a 
                        className='ml-2 cursor-pointer text-blue-300 hover:underline' 
                        onClick={() => navigate('/register')}
                    >
                        Sign up
                    </a>
                </p>
            </form>
        </div>
    );
};

export default Login;
