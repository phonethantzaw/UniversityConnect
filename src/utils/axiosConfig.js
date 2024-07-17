import axios from 'axios';

const axiosConfig = axios.create();

axiosConfig.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosConfig.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            const status = error.response.status;
            if (status === 401) {
                console.error('Unauthorized request:', error);
                // Optionally, handle token refresh here
            } else if (status === 403) {
                console.error('Forbidden request:', error);
            } else {
                console.error('Request error:', error);
            }
        } else {
            console.error('Network error:', error);
        }
        return Promise.reject(error);
    }
);

export default axiosConfig;
