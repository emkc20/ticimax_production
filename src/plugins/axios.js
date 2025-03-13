import axios from 'axios';

const api = axios.create({
    baseURL: 'https://dummyjson.com/products',
    timeout: 10000,
});

api.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error('API Hatası:', error);
        return Promise.reject(error);
    }
);

export default api
