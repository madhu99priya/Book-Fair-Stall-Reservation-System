import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

// Optional: quick debug to confirm at runtime (remove later)
if (!baseURL) {
  // eslint-disable-next-line no-console
  console.warn('VITE_API_BASE_URL is undefined. Requests will fall back to http://localhost:5173');
} else {
  // eslint-disable-next-line no-console
  console.log('API baseURL =', baseURL);
}

const apiClient = axios.create({
  baseURL, // e.g., http://localhost:8081/api
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_jwt_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default apiClient;