import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8085/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request Interceptor: Attach JWT Token from localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('estateiq_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Catch 401 Unauthorized and auto-unwrap envelopes
api.interceptors.response.use(
  (response) => {
    // If backend returns standard ApiResponse envelope { success: true, data: ... },
    // merge response.data.data onto response.data so consumers can access fields directly
    if (response.data && response.data.data !== undefined && response.data.success !== undefined) {
      if (typeof response.data.data === 'object' && response.data.data !== null && !Array.isArray(response.data.data)) {
        Object.assign(response.data, response.data.data);
      }
    }
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token and broadcast session expiration
      localStorage.removeItem('estateiq_token');
      localStorage.removeItem('estateiq_user');
      window.dispatchEvent(new CustomEvent('auth:expired'));
    }
    return Promise.reject(error);
  }
);

export default api;
