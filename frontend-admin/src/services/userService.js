import apiClient from './apiClient.js';

const usersService = {
  async list(params = {}) {
    const { data } = await apiClient.get('/users', { params });
    return data;
  },
  async updateRoles(userId, roles) {
    const { data } = await apiClient.put(`/users/${userId}/roles`, { roles });
    return data;
  }
};

export default usersService;