import React, { useEffect, useState } from 'react';
import { allblogList } from "../api/Blog";
import { MdOutlineContentCopy } from "react-icons/md";
import Spinner from "../Components/Spinner";
import { FaRegHeart } from "react-icons/fa";
import toast from 'react-hot-toast';
import { AiOutlineRetweet } from "react-icons/ai";
import { BiUpvote } from "react-icons/bi";

function Home() {
    const [blogs, setBlogs] = useState([]);
    const [likedBlogs, setLikedBlogs] = useState({});

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

    function copyhandler(text){
       navigator.clipboard.writeText(text).then(()=>{
        toast.success("Copied");
       }).catch((error)=>{
        console.error('Failed to copy text: ', error);
       });
    }

    function handleLike(index) {
        setLikedBlogs(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    }

    return (
        <div className='m-6 px-6 py-3'>
            {blogs.length > 0 ? (
                blogs.map((item, index) => {
                    return (
                        <div key={index} className='my-5 border-b border-gray-300 pb-2 flex flex-col gap-2'>
                            <div className='text-3xl font-bold inter'>{item.title}</div>
                            <div className='flex items-center justify-between'>
                                <div className='inter'>{item.description}</div>
                                <div onClick={() => { copyhandler(item.description) }} className='cursor-pointer'><MdOutlineContentCopy size={"20px"} /></div>
                            </div>
                            <div className='flex items-center gap-10'>
                                <div>{new Date(item.createdAt).toDateString()}</div>
                                <div 
                                    onClick={() => handleLike(index)} 
                                    className={`cursor-pointer p-2 rounded-full ${likedBlogs[index] ? 'bg-red-600 text-white' : 'bg-white text-red-600'}`}
                                >
                                    <FaRegHeart size={"18px"} />
                                </div>
                                <div className='cursor-pointer' title='Retweet'><AiOutlineRetweet size={"18px"} /></div>
                                <div className='cursor-pointer' title='Upvote'><BiUpvote size={"18px"} /></div>
                            </div>
                        </div>
                    );
                })
            ) : (
                <div className='flex flex-col items-center justify-center h-screen'>
                    <div className='flex justify-center items-center'><Spinner /></div>
                    Blogs are Loading...
                </div>
            )}
        </div>
    );
}

export default Home;
