import axios from "axios";
const API_URL = import.meta.env.VITE_NODE_ENV === "production" ? import.meta.env.VITE_API_URL : import.meta.env.VITE_DEV_API_URL;

const create = async (credentials) => {
    let response = await axios.post(`${API_URL}/posts/create`, credentials);
    return response
}
const read = (id) => {
    return axios.get(`${API_URL}/posts/` + id );
}

const getAllPosts = () => {
    return axios.get(`${API_URL}/posts`)
}
const update = (credentials, postId) => {
    return axios.put(`${API_URL}/posts/${postId}`, credentials);
}

const remove = (id) => {
    return axios.delete(`${API_URL}/posts/${id}`)
}



export default {create, read, update, remove, getAllPosts}