import apiClient from './apiClient.js';

const authService = {
  async login(username, password) {
    const { data } = await apiClient.post('/auth/login', { username, password });
    // Backend returns { token: '...', user: {...} }
    return data.token || data;
  },
  async me() {
    const { data } = await apiClient.get('/auth/me');
    return data;
  }
};

export default authService;