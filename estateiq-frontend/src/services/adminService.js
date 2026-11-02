import api from './api';
import { MOCK_USERS, INITIAL_PROPERTIES } from '../utils/mockData';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_API !== 'false';

const getStoredUsers = () => {
  const saved = localStorage.getItem('estateiq_admin_users');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return MOCK_USERS;
    }
  }
  localStorage.setItem('estateiq_admin_users', JSON.stringify(MOCK_USERS));
  return MOCK_USERS;
};

const saveUsers = (users) => {
  localStorage.setItem('estateiq_admin_users', JSON.stringify(users));
};

export const adminService = {
  async getUsers(params = {}) {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 200));
      let users = getStoredUsers();
      if (params.role && params.role !== 'all') {
        users = users.filter((u) => u.role === params.role);
      }
      if (params.search) {
        const s = params.search.toLowerCase();
        users = users.filter((u) => u.name.toLowerCase().includes(s) || u.email.toLowerCase().includes(s));
      }
      return users;
    }
    const response = await api.get('/admin/users', { params });
    return response.data;
  },

  async updateUserStatus(userId, status) {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 200));
      const users = getStoredUsers();
      const user = users.find((u) => u.id === userId);
      if (user) {
        user.status = status; // e.g., 'active' or 'blocked'
        user.blocked = status === 'blocked';
        saveUsers(users);
        return user;
      }
      throw new Error('User not found');
    }
    const response = await api.put(`/admin/users/${userId}/status`, { status });
    return response.data;
  },

  async getPendingProperties() {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 200));
      const savedProps = localStorage.getItem('estateiq_properties');
      const allProps = savedProps ? JSON.parse(savedProps) : INITIAL_PROPERTIES;
      return allProps.filter((p) => p.status === 'pending' || !p.verified);
    }
    const response = await api.get('/admin/properties/pending');
    return response.data;
  },

  async verifyProperty(propertyId, isApproved, rejectionReason = '') {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 300));
      const savedProps = localStorage.getItem('estateiq_properties');
      const allProps = savedProps ? JSON.parse(savedProps) : INITIAL_PROPERTIES;
      const prop = allProps.find((p) => p.id === propertyId);
      if (prop) {
        prop.verified = isApproved;
        prop.status = isApproved ? 'active' : 'rejected';
        if (!isApproved) prop.rejectionReason = rejectionReason;
        localStorage.setItem('estateiq_properties', JSON.stringify(allProps));
        return prop;
      }
      throw new Error('Property not found');
    }
    const response = await api.put(`/admin/properties/${propertyId}/verify`, {
      verified: isApproved,
      rejectionReason,
    });
    return response.data;
  },

  async getFraudFlags() {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 200));
      return [
        {
          id: 'FLG-801',
          propertyId: 'PROP008',
          propertyTitle: 'Suspicious Low-Price Bandra Flat (Audit Flagged)',
          sellerName: 'Suspicious Seller X',
          sellerPhone: '+91 90000 00000',
          price: 3500000,
          marketAverage: 18500000,
          fraudScore: 88,
          riskLevel: 'CRITICAL',
          reason: 'Severe Price Undercut (78% below circle rate) & VoIP Phone identity mismatch',
          status: 'Under Review',
        },
        {
          id: 'FLG-802',
          propertyId: 'PROP006',
          propertyTitle: 'Koregaon Park Riverside 3BHK',
          sellerName: 'Aarav Oberoi',
          sellerPhone: '+91 98211 99887',
          price: 14500000,
          marketAverage: 14000000,
          fraudScore: 22,
          riskLevel: 'LOW',
          reason: 'Duplicate interior image detected in Bangalore listing database',
          status: 'Cleared',
        },
      ];
    }
    const response = await api.get('/admin/fraud-flags');
    return response.data;
  },

  async getPlatformAnalytics() {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 200));
      return {
        totalUsers: 14820,
        buyersCount: 11240,
        sellersCount: 2680,
        agentsCount: 900,
        totalProperties: 3450,
        pendingVerificationCount: 14,
        criticalFraudAlerts: 2,
        monthlyGrowthPercent: 18.4,
        userGrowthData: [
          { month: 'Apr', users: 11200, listings: 2800 },
          { month: 'May', users: 12100, listings: 2950 },
          { month: 'Jun', users: 12900, listings: 3100 },
          { month: 'Jul', users: 13600, listings: 3250 },
          { month: 'Aug', users: 14200, listings: 3380 },
          { month: 'Sep', users: 14820, listings: 3450 },
        ],
        regionalDistribution: [
          { region: 'Mumbai MMR', count: 1120 },
          { region: 'Bengaluru Tech', count: 980 },
          { region: 'Hyderabad Cyber', count: 640 },
          { region: 'Delhi NCR', count: 480 },
          { region: 'Pune & Goa', count: 230 },
        ],
      };
    }
    const response = await api.get('/admin/analytics');
    return response.data;
  },
};
