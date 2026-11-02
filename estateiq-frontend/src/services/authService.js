import api from './api';
import { MOCK_USERS } from '../utils/mockData';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_API !== 'false';

export const authService = {
  async login(email, password) {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 400));
      const user = MOCK_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (user) {
        const token = `jwt_mock_token_${user.role}_${Date.now()}`;
        localStorage.setItem('estateiq_token', token);
        localStorage.setItem('estateiq_user', JSON.stringify(user));
        return { user, token };
      }
      // If user typed another email, create a default buyer or matching role
      const newUser = {
        id: `usr_${Date.now()}`,
        name: email.split('@')[0],
        email: email,
        role: 'buyer',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        verified: true,
      };
      const token = `jwt_mock_token_buyer_${Date.now()}`;
      localStorage.setItem('estateiq_token', token);
      localStorage.setItem('estateiq_user', JSON.stringify(newUser));
      return { user: newUser, token };
    }

    const response = await api.post('/auth/login', { email, password });
    const resData = response.data?.data || response.data;
    if (resData.token) {
      localStorage.setItem('estateiq_token', resData.token);
      localStorage.setItem('estateiq_user', JSON.stringify(resData.user));
    }
    return resData;
  },

  async register({ name, email, password, role, phone }) {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 500));
      const validRole = role === 'admin' ? 'buyer' : role; // Admin cannot be registered publicly
      const user = {
        id: `usr_${Date.now()}`,
        name,
        email,
        role: validRole,
        phone,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        verified: true,
      };
      const token = `jwt_mock_token_${validRole}_${Date.now()}`;
      localStorage.setItem('estateiq_token', token);
      localStorage.setItem('estateiq_user', JSON.stringify(user));
      return { user, token };
    }

    const response = await api.post('/auth/register', { name, email, password, role, phone });
    const resData = response.data?.data || response.data;
    if (resData.token) {
      localStorage.setItem('estateiq_token', resData.token);
      localStorage.setItem('estateiq_user', JSON.stringify(resData.user));
    }
    return resData;
  },

  async forgotPassword(email) {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 400));
      return { message: 'Password reset link sent to your email address.' };
    }
    const response = await api.post('/auth/forgot-password', { email });
    return response.data?.data || response.data;
  },

  async resetPassword(token, newPassword) {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 400));
      return { message: 'Your password has been successfully reset.' };
    }
    const response = await api.post('/auth/reset-password', { token, newPassword });
    return response.data?.data || response.data;
  },

  logout() {
    localStorage.removeItem('estateiq_token');
    localStorage.removeItem('estateiq_user');
  },

  getCurrentUser() {
    const saved = localStorage.getItem('estateiq_user');
    return saved ? JSON.parse(saved) : null;
  },

  getToken() {
    return localStorage.getItem('estateiq_token');
  },
};
