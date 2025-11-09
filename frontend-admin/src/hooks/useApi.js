import { useAuth } from './useAuth.js';
import apiClient from '../services/apiClient.js';

export default function useApi() {
  const { token, logout } = useAuth();

  return (config) =>
    apiClient({
      ...config,
      headers: {
        ...(config.headers || {}),
        Authorization: token ? `Bearer ${token}` : undefined
      }
    }).catch((err) => {
      if (err.response?.status === 401) {
        logout();
      }
      throw err;
    });
}