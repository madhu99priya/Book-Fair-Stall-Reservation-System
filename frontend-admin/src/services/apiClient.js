import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api', // proxied to backend by Vite
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_jwt_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default apiClient;