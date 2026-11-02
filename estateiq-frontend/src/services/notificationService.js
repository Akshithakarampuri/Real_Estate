import api from './api';
import { MOCK_NOTIFICATIONS } from '../utils/mockData';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_API !== 'false';

const getStoredNotifications = () => {
  const saved = localStorage.getItem('estateiq_notifications');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return MOCK_NOTIFICATIONS;
    }
  }
  localStorage.setItem('estateiq_notifications', JSON.stringify(MOCK_NOTIFICATIONS));
  return MOCK_NOTIFICATIONS;
};

const saveNotifications = (notifs) => {
  localStorage.setItem('estateiq_notifications', JSON.stringify(notifs));
};

export const notificationService = {
  async getNotifications() {
    if (USE_MOCK) {
      return getStoredNotifications();
    }
    const response = await api.get('/notifications');
    return response.data;
  },

  async markAsRead(id) {
    if (USE_MOCK) {
      const list = getStoredNotifications();
      const item = list.find((n) => n.id === id);
      if (item) item.read = true;
      saveNotifications(list);
      return list;
    }
    const response = await api.put(`/notifications/${id}/read`);
    return response.data;
  },

  async markAllAsRead() {
    if (USE_MOCK) {
      const list = getStoredNotifications();
      list.forEach((n) => (n.read = true));
      saveNotifications(list);
      return list;
    }
    const response = await api.put('/notifications/read-all');
    return response.data;
  },
};
