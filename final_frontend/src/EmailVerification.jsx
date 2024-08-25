import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EmailVerification = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [status, setStatus] = useState('verifying');
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Construct the verification URL
        const verifyUrl = location.pathname + location.search;

        console.log('Verification URL:', verifyUrl);

        // Change axios.post to axios.get to match the backend route method
        axios.get(verifyUrl)
            .then(response => {
                console.log('Verification successful:', response);
                setStatus('success');
                setMessage('Your email has been successfully verified!');
                setTimeout(() => {
                    navigate('/login');
                }, 5000);
            })
            .catch(error => {
                console.error('Verification failed:', error);
                setStatus('error');
                if (error.response && error.response.data.message) {
                    setMessage(error.response.data.message);
                } else {
                    setMessage('An error occurred while verifying your email. Please try again.');
                }
            });
    }, [location, navigate]);

    const renderContent = () => {
        switch (status) {
            case 'verifying':
                return (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">Verifying your email...</h2>
                        <p>Please wait while we verify your email address.</p>
                    </div>
                );
            case 'success':
                return (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-green-500 mb-4">Success!</h2>
                        <p>{message}</p>
                        <button
                            onClick={() => navigate('/login')}
                            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Go to Login
                        </button>
                    </div>
                );
            case 'error':
                return (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-red-500 mb-4">Verification Failed</h2>
                        <p>{message}</p>
                        <button
                            onClick={() => navigate('/register')}
                            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Register Again
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                {renderContent()}
            </div>
        </div>
    );
};

export default EmailVerification;
