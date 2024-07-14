import axios from "axios";

const BACKEND_ORIGIN_URL = "https://write-x-backend.vercel.app";
//const BACKEND_ORIGIN_URL = "http://localhost:3000";

const allblogList = async () => {
    try {
        const allBlogs = await axios.get(`${BACKEND_ORIGIN_URL}/blog/allblog`);
        return allBlogs.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error("Error fetching blogs:");
        }
    }
}

const createBlog = async (title, description, token) => {
    try {
        const response = await axios.post(
            `${BACKEND_ORIGIN_URL}/blog/createblog`,
            { title, description },
            { headers: { Authorization: `Bearer ${token}` } } // Set the token in headers
        );
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error("Error creating blog");
        }
    }
}

export { allblogList,createBlog };
