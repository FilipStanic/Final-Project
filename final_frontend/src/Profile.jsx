import React from 'react';
import { useAuth } from './AuthContext';

const Profile = () => {
    const { user } = useAuth();

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-gray-800 rounded-lg">
            <h1 className="text-2xl font-bold mb-4">My Profile</h1>
            {user ? (
                <div>
                    <p className="text-white"><strong>Name:</strong> {user.name}</p>
                    <p className="text-white"><strong>Email:</strong> {user.email}</p>
                </div>
            ) : (
                <p className="text-white">Loading profile...</p>
            )}
        </div>
    );
};

export default Profile;
