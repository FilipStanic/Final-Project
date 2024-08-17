import React from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrationSuccess = () => {
    const navigate = useNavigate();

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md text-center">
                <h2 className="text-2xl font-bold text-green-500">Registration Successful!</h2>
                <p className="text-gray-700">Your account has been created successfully.</p>
                <button
                    onClick={handleLoginRedirect}
                    className="w-full py-2 px-4 mt-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Go to Login
                </button>
            </div>
        </div>
    );
};

export default RegistrationSuccess;
