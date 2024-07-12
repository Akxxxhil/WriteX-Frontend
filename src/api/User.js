import axios from "axios";

const BACKEND_ORIGIN_URL = "https://write-x-backend.vercel.app";

const signup = async (name, email, password, confirmpassword) => {
    try {
        const responseSignup = await axios.post(`${BACKEND_ORIGIN_URL}/user/signup`, { name, email, password, confirmpassword });
        return responseSignup.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error("An unknown error occurred");
        }
    }
};

const login = async (email, password) => {
    try {
        const response = await axios.post(`${BACKEND_ORIGIN_URL}/user/login`, { email, password });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error("Error while Login");
        }
    }
};

const userDetails = async (id) => {
    try {
        const userresponse = await axios.get(`${BACKEND_ORIGIN_URL}/user/userdetails/${id}`);
        return userresponse.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error("An unknown error occurred");
        }
    }
};

export { signup, login, userDetails };
