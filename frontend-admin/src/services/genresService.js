import apiClient from './apiClient.js';

const genresService = {
  async list() {
    const { data } = await apiClient.get('/genres');
    return data;
  },
  async create(payload) {
    const { data } = await apiClient.post('/genres', payload);
    return data;
  },
  async remove(id) {
    const { data } = await apiClient.delete(`/genres/${id}`);
    return data;
  }
};

export default genresService;