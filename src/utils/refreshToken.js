import axios from 'axios';

export const refreshToken = async () => {
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('No refreshToken found');

        const response = await axios.post('http://localhost:8080/users/refresh-token', { refreshToken });
        const { accessToken, refreshToken: newRefreshToken } = response.data;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', newRefreshToken);

        return accessToken;
    } catch (error) {
        console.error('Failed to refresh token:', error);
        // Handle token refresh failure
    }
};
