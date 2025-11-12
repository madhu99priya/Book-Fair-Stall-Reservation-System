import apiClient from './apiClient.js';

const reservationsService = {
  async list(params = {}) {
    const { data } = await apiClient.get('/reservations', { params });
    return data;
  },
  async details(id) {
    const { data } = await apiClient.get(`/reservations/${id}`);
    return data;
  },
  async cancel(id) {
    const { data } = await apiClient.delete(`/reservations/${id}`);
    return data;
  }
};

export default reservationsService;