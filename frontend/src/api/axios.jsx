import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    withCredentials: true,
});

// ✅ Request interceptor
api.interceptors.request.use(
    (config) => {

        const rawToken = localStorage.getItem("token");

        let token = rawToken;

        try {
            token = JSON.parse(rawToken);
        } catch {
            token = rawToken;
        }

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// ✅ Response interceptor
api.interceptors.response.use(
    (response) => response,

    (error) => {

        if (error.response?.status === 401) {
            console.warn("Unauthorized! Redirecting to login...");

            localStorage.clear();

            window.location.href = "/";
        }

        return Promise.reject(error);
    }
);

export default api;