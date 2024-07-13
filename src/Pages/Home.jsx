import React, { useEffect, useState } from 'react';
import { allblogList } from "../api/Blog";
import { MdOutlineContentCopy } from "react-icons/md";
import Spinner from "../Components/Spinner"
import toast from 'react-hot-toast';

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

    function copyhandler(text){
       navigator.clipboard.writeText(text).then(()=>{
        toast.success("copied")
       }).catch((error)=>{
        console.error('Failed to copy text: ', error);
       })
        
    }

    return (
        <div className='m-6 px-6 py-3'>
            {blogs.length > 0 ? (
                blogs.map((item, index) => {
                    return (
                        <div key={index} className='my-5'>
                            <div className='text-3xl font-bold inter'>{item.title}</div>
                            <div className='flex items-center justify-between'>
                                <div  className='inter'>{item.description}</div>
                                <div onClick={()=>{copyhandler(item.description)}} className='cursor-pointer'><MdOutlineContentCopy size={"20px"} /></div>
                            </div>
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
