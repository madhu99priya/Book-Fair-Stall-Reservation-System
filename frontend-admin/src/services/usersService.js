import apiClient from './apiClient.js';

const usersService = {
  async list(params = {}) {
    const { data } = await apiClient.get('/users', { params });
    return data;
  },
  async updateRole(userId, role) {
    const { data } = await apiClient.put(`/users/${userId}/role`, { role });
    return data;
  }
};

export default usersService;