import axios from "axios";
import Cookies from "universal-cookie";

const fileHttpClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_FILE_UPLOAD_URL,
    timeout: 5000
});

fileHttpClient.interceptors.request.use((config) => {
    const token = new Cookies().get("token");
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

fileHttpClient.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    console.error(error.response?.data || error.message)
    return Promise.reject(error);
})

export default fileHttpClient;