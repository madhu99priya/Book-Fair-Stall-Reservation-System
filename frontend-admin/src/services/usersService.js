import apiClient from './apiClient.js';

const usersService = {
  async list(params = {}) {
    const { data } = await apiClient.get('/users', { params });
    return data;
  },
  async getById(userId) {
    const { data } = await apiClient.get(`/users/${userId}`);
    return data;
  },
  async update(userId, userData) {
    const { data } = await apiClient.put(`/users/${userId}`, userData);
    return data;
  },
  async delete(userId) {
    const { data } = await apiClient.delete(`/users/${userId}`);
    return data;
  },
  async updateRoles(userId, roles) {
    const { data } = await apiClient.put(`/users/${userId}/roles`, { roles });
    return data;
  }
};

export default usersService;