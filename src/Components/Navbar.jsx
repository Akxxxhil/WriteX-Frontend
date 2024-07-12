import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar({ isLoggedIn, handleLogout }) {
  
    const navigate = useNavigate();
    const userId = localStorage.getItem('user');

    return (
        <div className='flex items-center gap-4 justify-between px-6 py-3'>
            <div className='flex items-center gap-4'>
                <div className='inter cursor-pointer font-bold text-3xl tracking-tighter' onClick={() => navigate('/')}>WriteX</div>
            </div>
            <div className='flex items-center gap-3 inter'>
                <div className='cursor-pointer' onClick={() => 
                    navigate('/about')}>About</div>
                <div className='cursor-pointer' onClick={() => navigate('/career')}>Career</div>
                {isLoggedIn ? (
                    <>
                        <div>Write</div>
                        <div className='cursor-pointer' onClick={() => navigate(`/profile/${userId}`)}>Profile</div>
                        <div className='cursor-pointer' onClick={() => {
                            handleLogout();
                            localStorage.removeItem('token');
                            localStorage.removeItem('user');
                            navigate('/');
                        }}>Logout</div>

                    </>
                ) : (
                    <>
                        <div className='cursor-pointer' onClick={() => navigate('/login')}>Login</div>
                        <div className='cursor-pointer' onClick={() => navigate('/signup')}>Signup</div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Navbar;
