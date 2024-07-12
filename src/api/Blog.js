import axios from "axios";

const BACKEND_ORIGIN_URL = "https://write-x-backend.vercel.app";

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

export { allblogList };
