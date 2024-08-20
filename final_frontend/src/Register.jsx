import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register', {
                name,
                email,
                password,
                password_confirmation: passwordConfirmation,
            });

            setSuccess('Registration successful! Redirecting to login...');
            setTimeout(() => {
                navigate('/success');
            }, 1500);
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message || 'Registration failed. Please try again.');
            } else {
                setError('Something went wrong. Please try again later.');
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen ">
            <div className="w-full max-w-md p-8 space-y-6 rounded-lg shadow-md bg-[#093a74]">
                <h2 className="text-2xl font-bold text-center text-white">Sign Up</h2>
                {error && <div className="text-red-500 text-center">{error}</div>}
                {success && <div className="text-green-500 text-center">{success}</div>}
                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-white">Name</label>
                        <input
                            type="text"
                            id="name"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-300 focus:border-orange-300 text-black"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-300 focus:border-orange-300 text-black"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-300 focus:border-orange-300 text-black"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="passwordConfirmation" className="block text-sm font-medium text-white">Confirm Password</label>
                        <input
                            type="password"
                            id="passwordConfirmation"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-300 focus:border-orange-300 text-black"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Register
                    </button>

                    <p className='text-white mt-10 text-center'>
                    Already have an account?
                    <a 
                        className='ml-2 cursor-pointer text-blue-300 hover:underline' 
                        onClick={() => navigate('/login')}
                    >
                        Log in
                    </a>
                </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
