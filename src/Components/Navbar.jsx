import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LeftNav from './LeftNavbar/LeftNav';
import { IoMdMenu } from "react-icons/io";

function Navbar({ isLoggedIn, handleLogout }) {
    const [openNav, setOpenNav] = useState(false)

    const navigate = useNavigate();
    const userId = localStorage.getItem('user');

    const opennavbar = () => {
        setOpenNav(!openNav)
    }
    return (
        <div className='flex items-center gap-4 justify-between px-6 py-3'>
            <div className='flex items-center gap-4'>
                <div className='inter cursor-pointer font-bold text-3xl tracking-tighter' onClick={() => navigate('/')}>
                    <span className='flex gap-3 items-center'>
                        <span onClick={opennavbar}><IoMdMenu /></span>
                        <span>WriteX</span>
                    </span>
                </div>
            </div>
            <div className='flex items-center gap-3 inter'>

                {isLoggedIn ? (
                    <>
                        <div className='cursor-pointer' onClick={() => navigate("/write")}>Write</div>
                        <div className='cursor-pointer' onClick={() => navigate(`/profile/${userId}`)}>Profile</div>
                        <div className='cursor-pointer' onClick={() => {
                            handleLogout();
                            localStorage.removeItem('token');
                            localStorage.removeItem('user');
                            navigate('/');
                        }}>Logout</div>
                        <div
                            className={`fixed top-0 left-0 h-full bg-white shadow-lg w-64 transform ${openNav ? 'translate-x-0' : '-translate-x-full'
                                } transition-transform duration-300 ease-in-out z-50`}
                        >
                            <LeftNav setOpenNav={setOpenNav} />
                        </div>

                    </>
                ) : (
                    <>
                        <div className='cursor-pointer' onClick={() =>
                            navigate('/about')}>About</div>
                        <div className='cursor-pointer' onClick={() => navigate('/career')}>Career</div>
                        <div className='cursor-pointer' onClick={() => navigate('/login')}>Login</div>
                        <div className='cursor-pointer' onClick={() => navigate('/signup')}>Signup</div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Navbar;
