import axios from "axios";
import Cookies from "universal-cookie";

const httpClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

httpClient.interceptors.request.use((config) => {
    const token = new Cookies().get("token");
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

httpClient.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    console.error(error.response?.data || error.message)
    return Promise.reject(error);
})

export default httpClient;