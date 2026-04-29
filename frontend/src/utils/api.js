import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Assumes backend runs on 5000
    headers: {
        'Content-Type': 'application/json',
    },
});

// Intercept requests to attach JWT token
api.interceptors.request.use(
    (config) => {
        const authData = JSON.parse(localStorage.getItem('authData'));
        if (authData && authData.token) {
            config.headers.Authorization = `Bearer ${authData.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
