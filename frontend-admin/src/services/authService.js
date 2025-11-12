import apiClient from './apiClient.js';

const authService = {
  async login(email, password) {
    const { data } = await apiClient.post('http://localhost:8081/api/users/admin/login', { email, password });

    if (!data?.token) {
      throw new Error('Login failed: Invalid credentials or not an admin');
    }

    return data.token;
  },

  async me() {
    const { data } = await apiClient.get('http://localhost:8081/api/api/users/me');
    return data;
  },
};

export default authService;
