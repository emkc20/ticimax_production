import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://dummyjson.com/products',
    timeout: 10000,
});

instance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error('API Hatası:', error);
        return Promise.reject(error);
    }
);

export default {
    install(Vue) {
        Vue.prototype.$axios = instance;
    }
};
