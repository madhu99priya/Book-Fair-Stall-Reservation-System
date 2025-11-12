import apiClient from './apiClient.js';

const stallsService = {
  async list(params = {}) {
    const { data } = await apiClient.get('/stalls', { params });
    return data;
  },
  async create(stallData) {
    const { data } = await apiClient.post('/stalls', stallData);
    return data;
  },
  async update(id, stallData) {
    const { data } = await apiClient.put(`/stalls/${id}`, stallData);
    return data;
  },
  async delete(id) {
    const { data } = await apiClient.delete(`/stalls/${id}`);
    return data;
  },
  async reserve(stallIds, businessId) {
    const { data } = await apiClient.post('/reservations', { stallIds, businessId });
    return data;
  },
  async release(stallId) {
    const { data } = await apiClient.post(`/stalls/${stallId}/release`);
    return data;
  }
};

export default stallsService;