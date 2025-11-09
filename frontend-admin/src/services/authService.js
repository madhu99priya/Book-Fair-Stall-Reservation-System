import apiClient from './apiClient.js';

const authService = {
  async login(username, password) {
    const { data } = await apiClient.post('/auth/login', { username, password });
    return data.token; // Assume backend responds { token: '...' }
  },
  async me() {
    const { data } = await apiClient.get('/auth/me');
    return data;
  }
};

export default authService;