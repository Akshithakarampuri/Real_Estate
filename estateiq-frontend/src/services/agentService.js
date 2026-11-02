import api from './api';
import { MOCK_CRM_LEADS } from '../utils/mockData';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_API !== 'false';

const getStoredLeads = () => {
  const saved = localStorage.getItem('estateiq_agent_leads');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return MOCK_CRM_LEADS;
    }
  }
  localStorage.setItem('estateiq_agent_leads', JSON.stringify(MOCK_CRM_LEADS));
  return MOCK_CRM_LEADS;
};

const saveLeads = (leads) => {
  localStorage.setItem('estateiq_agent_leads', JSON.stringify(leads));
};

export const agentService = {
  async getClients(agentId = 'agt_1') {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 200));
      return getStoredLeads();
    }
    const response = await api.get(`/agent/${agentId}/clients`);
    return response.data;
  },

  async createClient(clientData, agentId = 'agt_1') {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 300));
      const leads = getStoredLeads();
      const newLead = {
        ...clientData,
        id: `lead-${Date.now()}`,
        stage: clientData.stage || 'NEW',
        score: Math.floor(70 + Math.random() * 25),
      };
      leads.unshift(newLead);
      saveLeads(leads);
      return newLead;
    }
    const response = await api.post(`/agent/${agentId}/clients`, clientData);
    return response.data;
  },

  async updateClientStatus(clientId, status) {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 200));
      const leads = getStoredLeads();
      const lead = leads.find((l) => l.id === clientId);
      if (lead) {
        lead.stage = status;
        saveLeads(leads);
        return lead;
      }
      throw new Error('Client not found');
    }
    const response = await api.put(`/agent/clients/${clientId}/status`, { status });
    return response.data;
  },

  async getAgentAnalytics() {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 250));
      return {
        activeListingsCount: 12,
        totalLeads: 28,
        visitsThisMonth: 19,
        dealsClosed: 8,
        conversionRate: '28.5%',
        monthlyRevenue: [
          { month: 'Apr', deals: 2, commission: 340000 },
          { month: 'May', deals: 3, commission: 480000 },
          { month: 'Jun', deals: 4, commission: 620000 },
          { month: 'Jul', deals: 3, commission: 510000 },
          { month: 'Aug', deals: 5, commission: 780000 },
          { month: 'Sep', deals: 6, commission: 920000 },
        ],
        pipelineBreakdown: [
          { stage: 'NEW', count: 7, value: '₹14.2 Cr' },
          { stage: 'CONTACTED', count: 6, value: '₹11.8 Cr' },
          { stage: 'VISITED', count: 5, value: '₹9.5 Cr' },
          { stage: 'NEGOTIATION', count: 4, value: '₹8.4 Cr' },
          { stage: 'CLOSED', count: 6, value: '₹12.6 Cr' },
        ],
      };
    }
    const response = await api.get('/agent/analytics');
    return response.data;
  },

  async getAppointments() {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 200));
      return [
        {
          id: 'apt-1',
          clientName: 'Siddharth Malhotra',
          phone: '+91 98201 11223',
          propertyTitle: 'The Altitude Sky Villa',
          date: '2026-09-12',
          time: '10:30 AM',
          type: 'Site Walkthrough',
          status: 'Confirmed',
        },
        {
          id: 'apt-2',
          clientName: 'Neha Kapoor',
          phone: '+91 98450 99887',
          propertyTitle: 'Lakeview Grand 3BHK',
          date: '2026-09-12',
          time: '03:00 PM',
          type: 'Contract Signing Prep',
          status: 'Confirmed',
        },
        {
          id: 'apt-3',
          clientName: 'Karan Johar',
          phone: '+91 98200 77665',
          propertyTitle: 'Golf Course Heights',
          date: '2026-09-14',
          time: '11:00 AM',
          type: 'Video Inspection',
          status: 'Pending',
        },
      ];
    }
    const response = await api.get('/agent/appointments');
    return response.data;
  },
};
