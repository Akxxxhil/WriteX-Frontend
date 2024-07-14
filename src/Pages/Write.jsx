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
        isAuthenticated ? (
            <form onSubmit={CreatePostHandler}>
                <label htmlFor="">Title</label>
                <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" />

                <label htmlFor="">Description</label>
                <input onChange={(e) => setDescription(e.target.value)} value={description} type="text" />

                <button type="submit">Publish</button>
            </form>
        ) : (
            <div>You are not eligible to write. Try after some time.</div>
        )
    );
}

export default Write;
