import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
    const { id, hash } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('loading');

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/email/verify/${id}/${hash}${location.search}`);
                setMessage(response.data.message);
                setStatus('success');
                setTimeout(() => navigate('/login'), 4000);
            } catch (error) {
                setMessage(error.response?.data?.message || 'Verification failed. The link may have expired.');
                setStatus('error');
            }
        };

        verifyEmail();
    }, [id, hash, navigate, location.search]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
                <h1 className="text-2xl font-bold mb-4">Email Verification</h1>
                {status === 'loading' ? (
                    <p className="text-gray-600">Verifying your email, please wait...</p>
                ) : (
                    <p className={`text-lg ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default VerifyEmail;
