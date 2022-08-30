import axios from 'axios';

const api = axios.create({
    baseURL: "https://bn-assentos-api.vercel.app/"
})

export default api;