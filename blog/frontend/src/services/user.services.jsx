import axios from 'axios';
import helperServices from './helper.services';

// const API_URL = import.meta.env.VITE_NODE_ENV === "production" ? import.meta.env.VITE_API_URL : import.meta.env.VITE_DEV_API_URL;
const API_URL = helperServices.getAPIURL();

const signup = async (credentials) => {
    const response = await axios.post(`${API_URL}/users/signup`, credentials);
    return response
};

const login = (credentials) => {
    return axios.post(`${API_URL}/users/login`, credentials);
};

const getUser = (userId) => {
    return axios.get(`${API_URL}/users`, { params: { userId } })
}

export default { signup, login, getUser };
