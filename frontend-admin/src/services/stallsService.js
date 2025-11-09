import apiClient from './apiClient.js';

const stallsService = {
  async list(params = {}) {
    const { data } = await apiClient.get('/stalls', { params });
    return data;
  },
  async reserve(stallIds, businessId) {
    const { data } = await apiClient.post('/stalls/reserve', { stallIds, businessId });
    return data;
  },
  async release(stallId) {
    const { data } = await apiClient.post(`/stalls/${stallId}/release`);
    return data;
  }
};

export default stallsService;