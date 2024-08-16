import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                email: email,
                password: password,
            });
            console.log('Login successful:', response.data);
        } catch (error) {
            console.error('Error logging in:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='text-black'
                />
            </label>
            <br />
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='text-black'
                />
            </label>
            <br />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
