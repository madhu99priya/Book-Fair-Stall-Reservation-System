import apiClient from './apiClient.js';

// Accepts either:
// - login({ username, password })
// - login(username, password)
function normalizeCredentials(arg1, arg2) {
  if (typeof arg1 === 'object' && arg1 !== null) {
    const { username, password } = arg1;
    return { username, password };
  }
  return { username: arg1, password: arg2 };
}

const TOKEN_KEY = 'admin_jwt_token';

const authService = {
  async login(arg1, arg2) {
    const { username, password } = normalizeCredentials(arg1, arg2);

    const { data } = await apiClient.post('/auth/login', { username, password });
    const token = data?.token;
    if (!token) throw new Error('Login failed: token missing in response');

    // Persist token so apiClient interceptor can attach it
    localStorage.setItem(TOKEN_KEY, token);

    // Keep return value backward-compatible (was just token)
    return token;
  },

  async me() {
    const { data } = await apiClient.get('/auth/me');
    return data;
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }
};

export default authService;