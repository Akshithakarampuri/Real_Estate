import api from './api';
import { MOCK_BOOKINGS } from '../utils/mockData';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_API !== 'false';

const getStoredBookings = () => {
  const saved = localStorage.getItem('estateiq_bookings');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return MOCK_BOOKINGS;
    }
  }
  localStorage.setItem('estateiq_bookings', JSON.stringify(MOCK_BOOKINGS));
  return MOCK_BOOKINGS;
};

const saveBookings = (bookings) => {
  localStorage.setItem('estateiq_bookings', JSON.stringify(bookings));
};

export const bookingService = {
  async getBookings() {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 200));
      return getStoredBookings();
    }
    const response = await api.get('/bookings');
    return response.data;
  },

  async createBooking(bookingData) {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 400));
      const list = getStoredBookings();
      const newBooking = {
        ...bookingData,
        id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
        status: 'Pending',
        createdAt: new Date().toISOString(),
      };
      list.unshift(newBooking);
      saveBookings(list);
      return newBooking;
    }
    const response = await api.post('/bookings', bookingData);
    return response.data;
  },

  async updateBookingStatus(bookingId, status, newDate = null, newTime = null) {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 300));
      const list = getStoredBookings();
      const index = list.findIndex((b) => b.id === bookingId);
      if (index !== -1) {
        list[index].status = status;
        if (newDate) list[index].date = newDate;
        if (newTime) list[index].time = newTime;
        saveBookings(list);
        return list[index];
      }
      throw new Error('Booking not found');
    }
    const response = await api.put(`/bookings/${bookingId}/status`, {
      status,
      date: newDate,
      time: newTime,
    });
    return response.data;
  },
};
