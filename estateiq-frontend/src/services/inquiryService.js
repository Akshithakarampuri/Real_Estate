import api from './api';
import { MOCK_INQUIRIES } from '../utils/mockData';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_API !== 'false';

const getStoredInquiries = () => {
  const saved = localStorage.getItem('estateiq_inquiries');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return MOCK_INQUIRIES;
    }
  }
  localStorage.setItem('estateiq_inquiries', JSON.stringify(MOCK_INQUIRIES));
  return MOCK_INQUIRIES;
};

const saveInquiries = (inquiries) => {
  localStorage.setItem('estateiq_inquiries', JSON.stringify(inquiries));
};

export const inquiryService = {
  async getInquiries() {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 200));
      return getStoredInquiries();
    }
    const response = await api.get('/inquiries');
    return response.data;
  },

  async sendInquiry({ propertyId, propertyTitle, message, buyerName, buyerEmail }) {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 300));
      const list = getStoredInquiries();
      const newInq = {
        id: `INQ-${Math.floor(200 + Math.random() * 800)}`,
        propertyId,
        propertyTitle,
        buyerName: buyerName || 'Interested Buyer',
        buyerEmail: buyerEmail || 'buyer@example.com',
        lastMessage: message,
        timestamp: new Date().toISOString(),
        unread: true,
        messages: [
          {
            id: `msg-${Date.now()}`,
            sender: 'buyer',
            text: message,
            time: 'Just now',
          },
        ],
      };
      list.unshift(newInq);
      saveInquiries(list);
      return newInq;
    }
    const response = await api.post('/inquiries', {
      propertyId,
      propertyTitle,
      message,
    });
    return response.data;
  },

  async replyInquiry(inquiryId, text, sender = 'seller') {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 250));
      const list = getStoredInquiries();
      const target = list.find((item) => item.id === inquiryId);
      if (target) {
        target.messages.push({
          id: `msg-${Date.now()}`,
          sender,
          text,
          time: 'Just now',
        });
        target.lastMessage = text;
        target.unread = false;
        saveInquiries(list);
        return target;
      }
      throw new Error('Inquiry not found');
    }
    const response = await api.post(`/inquiries/${inquiryId}/reply`, { text });
    return response.data;
  },
};
