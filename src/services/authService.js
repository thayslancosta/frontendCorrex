import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1';

const authService = {
  async login(email, senha) {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        senha,
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        if (response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getToken() {
    return localStorage.getItem('token');
  },

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated() {
    return !!localStorage.getItem('token');
  },
};

export const { login, logout, getToken, getUser, isAuthenticated } = authService;
export default authService;
