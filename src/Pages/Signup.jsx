import React, { useState } from 'react'
import { signup } from "../api/User"
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function Signup() {
    const navigate = useNavigate("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmpassword, setConfirmpassword] = useState("")
    async function submithandler(e) {
        e.preventDefault();
        try {
            const responseData = await signup(name, email, password, confirmpassword);
            if (responseData.success) {
                toast.success(responseData.message);
                navigate("/login");
            } else {
                toast.error(responseData.message);
            }
        } catch (error) {
            toast.error(error.message || "An error occurred during signup");
        }

    }
    return (
        <body className="bg-gray-100 flex items-center justify-center h-screen inter">
            <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Create an Account</h2>
                <form onSubmit={submithandler}>
                    <div classNameName="mb-2">
                        <label for="name" className="block text-gray-600 mb-2">Name</label>
                        <input onChange={(e) => { setName(e.target.value) }} type="text" value={name} className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required />
                    </div>
                    <div className="mb-2">
                        <label for="email" className="block text-gray-600 mb-2">Email</label>
                        <input onChange={(e) => { setEmail(e.target.value) }} type="email" value={email} className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required />
                    </div>
                    <div className="mb-2">
                        <label for="password" className="block text-gray-600 mb-2">Password</label>
                        <input onChange={(e) => { setPassword(e.target.value) }} type="password" value={password} className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required />
                    </div>
                    <div className="mb-2">
                        <label for="confirm-password" className="block text-gray-600 mb-2">Confirm Password</label>
                        <input onChange={(e) => { setConfirmpassword(e.target.value) }} type="password" value={confirmpassword} className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-300">Sign Up</button>
                    </div>
                    <div className="text-center">
                        <p className="text-sm text-gray-600">Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Log In</Link></p>
                    </div>
                </form>
            </div>
        </body>
    )
}

export default Signup
