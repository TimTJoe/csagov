import axios from 'axios';


const API_URL = import.meta.env.VITE_NODE_ENV === "production" ? import.meta.env.VITE_API_URL : import.meta.env.VITE_DEV_API_URL;
const signup = async (userData) => {
    const response = await axios.post(`${API_URL}/users/signup`, userData, {
        headers: { 'Content-Type': "application/json" }
    });
    return response
};

const login = (credentials) => {
    return axios.post(`${API_URL}/users/login`, credentials);
};

const getUser = () => {
    return axios.get(`${API_URL}/users`, { params: { id: "f4319da6-ae17-42db-b662-baee7d2de975" } })
}

export default { signup, login, getUser };
