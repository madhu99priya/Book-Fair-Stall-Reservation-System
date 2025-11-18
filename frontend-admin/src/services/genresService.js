import apiClient from './apiClient.js';

const genresService = {
  // Create a new genre
  createGenre: async (genre) => {
    const response = await apiClient.post('/genres', genre);
    return response.data;
  },

  // Get a genre by ID
  getGenreById: async (id) => {
    const response = await apiClient.get(`/genres/${id}`);
    return response.data;
  },

  // GET all genres
  list: async () => {
    const res = await apiClient.get('/genres');
    return res.data;
  },

  // PUT update genre
  update: async (id, payload) => {
    const res = await apiClient.put(`/genres/${id}`, payload);
    return res.data;
  },

  // Delete a genre
  deleteGenre: async (id) => {
    const response = await apiClient.delete(`/genres/${id}`);
    return response.data; // or return true
  }
};

export default genresService;