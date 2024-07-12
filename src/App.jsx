import React, { useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Home from './Pages/Home';
import About from './Pages/About';
import Career from './Pages/Career';
import toast, { Toaster } from 'react-hot-toast';
import Profile from './Pages/Profile';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = () => setIsLoggedIn(true);

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        toast.success('User logged out successfully');
    };

    return (
        <div>
            <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login handleLogin={handleLogin} />} />
                <Route path='/about' element={<About />} />
                <Route path='/career' element={<Career />} />
                <Route path='/profile/:id' element={<Profile />} />
            </Routes>
            <Toaster />
        </div>
    );
}

export default App;
