import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VerificationSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate('/login');
        }, 5000);
    }, [navigate]);

    return (
        <div className="text-center">
            <h2 className="text-2xl font-bold text-green-500 mb-4">Success!</h2>
            <p>Your email has been successfully verified!</p>
            <p>Redirecting to login page...</p>
        </div>
    );
};

export default VerificationSuccess;
