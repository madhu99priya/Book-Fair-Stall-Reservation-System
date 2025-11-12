import axios from 'axios';
import { getStoredToken } from '../utils/storage.js';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/api',
  timeout: 15000
});

// Request interceptor to add JWT token
apiClient.interceptors.request.use(
  (config) => {
    const token = getStoredToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    // Could send to monitoring service
    return Promise.reject(error);
  }
);

export default apiClient;