import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { MOCK_USERS } from '../utils/mockData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('estateiq_user');
    return saved ? JSON.parse(saved) : MOCK_USERS[0]; // Default to Demo Buyer
  });
  const [token, setToken] = useState(() => localStorage.getItem('estateiq_token') || 'demo_jwt_token_buyer');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Listen for session expiration events from api.js
    const handleExpired = () => {
      setUser(null);
      setToken(null);
    };
    window.addEventListener('auth:expired', handleExpired);
    return () => window.removeEventListener('auth:expired', handleExpired);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await authService.login(email, password);
      setUser(data.user);
      setToken(data.token);
      return data.user;
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData) => {
    setLoading(true);
    try {
      const data = await authService.register(formData);
      setUser(data.user);
      setToken(data.token);
      return data.user;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
  };

  // Instant Demo Switcher for fast verification across all 4 roles
  const switchDemoRole = async (role) => {
    const roleEmails = {
      admin: 'admin@estateiq.com',
      agent: 'agent@estateiq.com',
      seller: 'seller@estateiq.com',
      buyer: 'buyer@estateiq.com',
    };
    const email = roleEmails[role] || 'buyer@estateiq.com';
    try {
      const data = await authService.login(email, 'Password123');
      if (data && data.token) {
        setUser(data.user);
        setToken(data.token);
        return data.user;
      }
    } catch (e) {
      console.warn('Real login failed during role switch, using mock fallback', e);
    }
    const targetUser = MOCK_USERS.find((u) => u.role === role) || MOCK_USERS[0];
    const dummyToken = `jwt_mock_token_${targetUser.role}_${Date.now()}`;
    localStorage.setItem('estateiq_token', dummyToken);
    localStorage.setItem('estateiq_user', JSON.stringify(targetUser));
    setUser(targetUser);
    setToken(dummyToken);
    return targetUser;
  };

  const updateProfile = (updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem('estateiq_user', JSON.stringify(updated));
  };

  const value = {
    user,
    token,
    role: user?.role || 'guest',
    isAuthenticated: !!user && !!token,
    loading,
    login,
    register,
    logout,
    switchDemoRole,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
