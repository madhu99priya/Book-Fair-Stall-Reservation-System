import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000
});

// Optional global interceptor for logging
apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    // Could send to monitoring service
    return Promise.reject(error);
  }
);

export default apiClient;