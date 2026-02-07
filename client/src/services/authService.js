import BaseService from './BaseService';

class AuthService extends BaseService {
  constructor() {
    super('/auth');
  }

  async login(credentials) {
    const response = await this.post('/login', credentials);
    if (response.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response;
  }

  async register(userData) {
    const response = await this.post('/register', userData);
    if (response.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export const authService = new AuthService();
