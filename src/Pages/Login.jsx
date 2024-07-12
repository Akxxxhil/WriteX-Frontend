import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { login } from '../api/User';
import { useNavigate } from 'react-router-dom';

function Login({ handleLogin }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function submitHandler(e) {
        e.preventDefault();
        try {
            const responseData = await login(email, password);
            console.log('Response Data:', responseData);
            if (responseData.success) {
                toast.success(responseData.message);
                handleLogin();

                if (responseData.data) {
                    localStorage.setItem('token', responseData.data.token || '');
                    localStorage.setItem('user', responseData.data.id || '');
                }

                navigate('/');
            } else {
                toast.error(responseData.message);
            }
        } catch (error) {
            toast.error(error.message || 'An error occurred during Login');
        }
    }

    return (
        <div className='bg-gray-100 flex items-center justify-center h-screen inter'>
            <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-sm'>
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Welcome Back</h2>
                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-600 mb-2">Email</label>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" value={email} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-600 mb-2">Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" value={password} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required />
                    </div>
                    <div className="flex items-center justify-between">
                        <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300">Sign in</button>
                    </div>
                    <div className="text-center mt-6">
                        <a href="#" className="text-sm text-blue-500 hover:underline">Forgot Password?</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
