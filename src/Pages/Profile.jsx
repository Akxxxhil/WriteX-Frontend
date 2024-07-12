import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { userDetails } from '../api/User';
import toast from 'react-hot-toast';

function Profile() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                if (id) {
                    const response = await userDetails(id);
                    setUser(response.userDetails);
                } else {
                    toast.error('User ID not found');
                }
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>User details not found</div>;
    }

    return (
        <div className='p-4'>
            
            <div className='mt-4'>
                <p className='text-3xl font-bold'>{user.name}</p>
                <p>Email: {user.email}</p>
            </div>
        </div>
    );
}

export default Profile;
