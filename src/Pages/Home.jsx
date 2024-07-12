import React, { useEffect, useState } from 'react';
import { allblogList } from "../api/Blog";
import Spinner from "../Components/Spinner"

function Home() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await allblogList();
                setBlogs(response.allBlog);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        }
        fetchBlogs();
    }, []);

    return (
        <div className='m-6 px-6 py-3'>
            {blogs.length > 0 ? (
                blogs.map((item, index) => {
                    return (
                        <div key={index} className='my-5'>
                                <div className='text-3xl font-bold inter'>{item.title}</div>
                                <div className='inter'>{item.description}</div>
                        </div>
                    );
                })
            ) : (
                <div className='flex flex-col items-center justify-center'>
                    <div><Spinner /></div>
                    No blogs available
                </div>
            )}
        </div>
    );
}

export default Home;
