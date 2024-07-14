import React, { useEffect, useState } from 'react';
import { createBlog } from "../api/Blog";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Write() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState("");

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setIsAuthenticated(true);
            setToken(storedToken);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    async function CreatePostHandler(e) {
        e.preventDefault();
        try {
            const newBlog = await createBlog(title, description, token);
            if (newBlog.success) {
                toast.success(newBlog.message);
                navigate("/");
            } else {
                toast.error(newBlog.message);
            }
        } catch (error) {
            toast.error(error.message || 'An error occurred during creating Blog');
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f6d365] to-[#fda085] p-4">
            {isAuthenticated ? (
                <div className="flex flex-col lg:flex-row gap-4">
                    <form onSubmit={CreatePostHandler} className="bg-white p-6 rounded shadow-md w-full lg:w-1/2">
                        <h1 className="text-2xl font-bold mb-4">Write a New Blog</h1>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            id="title"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            type="text"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mt-4">Description</label>
                        <textarea
                            id="description"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            rows="10"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        ></textarea>
                        <button
                            type="submit"
                            className="mt-6 w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
                        >
                            Publish
                        </button>
                    </form>
                    <div className="bg-white p-6 rounded shadow-md w-full lg:w-1/2">
                        <h1 className="text-2xl font-bold mb-4">Preview</h1>
                        <div className="text-lg font-semibold mb-2">{title}</div>
                        <div>{description}</div>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center min-h-screen text-white text-center text-lg">
                    You are not eligible to write. Try after some time.
                </div>
            )}
        </div>
    );
}

export default Write;
