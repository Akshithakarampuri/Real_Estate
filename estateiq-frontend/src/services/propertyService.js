import api from './api';
import { INITIAL_PROPERTIES } from '../utils/mockData';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_API !== 'false';

// Keep local in-memory/localStorage properties cache for live additions/edits
const getStoredProperties = () => {
  const saved = localStorage.getItem('estateiq_properties');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return INITIAL_PROPERTIES;
    }
  }
  localStorage.setItem('estateiq_properties', JSON.stringify(INITIAL_PROPERTIES));
  return INITIAL_PROPERTIES;
};

const saveProperties = (props) => {
  localStorage.setItem('estateiq_properties', JSON.stringify(props));
};

export const propertyService = {
  async getProperties(params = {}) {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 250));
      let list = [...getStoredProperties()];

      if (params.location && params.location !== 'All') {
        const locLower = params.location.toLowerCase();
        list = list.filter(
          (p) =>
            p.city?.toLowerCase().includes(locLower) ||
            p.location?.toLowerCase().includes(locLower)
        );
      }

      if (params.propertyType && params.propertyType !== 'All') {
        list = list.filter((p) => p.propertyType === params.propertyType);
      }

      if (params.bhk && params.bhk !== 'All') {
        list = list.filter((p) => p.bhk === Number(params.bhk));
      }

      if (params.minPrice) {
        list = list.filter((p) => p.price >= Number(params.minPrice));
      }

      if (params.maxPrice) {
        list = list.filter((p) => p.price <= Number(params.maxPrice));
      }

      if (params.minArea) {
        list = list.filter((p) => p.area >= Number(params.minArea));
      }

      if (params.maxArea) {
        list = list.filter((p) => p.area <= Number(params.maxArea));
      }

      if (params.furnishing && params.furnishing !== 'All') {
        list = list.filter((p) => p.furnishing === params.furnishing);
      }

      if (params.possession && params.possession !== 'All') {
        list = list.filter((p) => p.possession === params.possession);
      }

      if (params.verifiedOnly) {
        list = list.filter((p) => p.verified);
      }

      if (params.amenities && params.amenities.length > 0) {
        list = list.filter((p) =>
          params.amenities.every((amenity) =>
            p.amenities?.some((a) => a.toLowerCase().includes(amenity.toLowerCase()))
          )
        );
      }

      // Sort
      if (params.sort) {
        if (params.sort === 'price_asc') {
          list.sort((a, b) => a.price - b.price);
        } else if (params.sort === 'price_desc') {
          list.sort((a, b) => b.price - a.price);
        } else if (params.sort === 'views') {
          list.sort((a, b) => (b.viewsCount || 0) - (a.viewsCount || 0));
        } else if (params.sort === 'newest') {
          list.sort((a, b) => (b.constructionYear || 2020) - (a.constructionYear || 2020));
        } else if (params.sort === 'recommended') {
          list.sort((a, b) => (b.matchPercentage || 0) - (a.matchPercentage || 0));
        }
      }

      const total = list.length;
      const page = params.page ? Number(params.page) : 1;
      const limit = params.limit ? Number(params.limit) : 9;
      const startIndex = (page - 1) * limit;
      const paginated = list.slice(startIndex, startIndex + limit);

      return {
        properties: paginated,
        total,
        page,
        totalPages: Math.ceil(total / limit) || 1,
      };
    }

    const cleanParams = {};
    if (params) {
      Object.entries(params).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== '' && val !== 'All') {
          if (Array.isArray(val)) {
            if (val.length > 0) cleanParams[key] = val;
          } else {
            cleanParams[key] = val;
          }
        }
      });
    }

    const response = await api.get('/properties', { params: cleanParams });
    const resData = response.data?.data || response.data;
    return {
      properties: resData?.properties || [],
      total: resData?.total || 0,
      page: resData?.page || 1,
      totalPages: resData?.totalPages || 1,
    };
  },

  async getPropertyById(id) {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 200));
      const list = getStoredProperties();
      const item = list.find((p) => p.id === id);
      if (!item) throw new Error('Property not found');
      return item;
    }
    const response = await api.get(`/properties/${id}`);
    return response.data?.data || response.data;
  },

  async createProperty(propertyData) {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 500));
      const list = getStoredProperties();
      const newProperty = {
        ...propertyData,
        id: `PROP${String(list.length + 1).padStart(3, '0')}`,
        status: 'pending', // Starts in pending for admin verification
        verified: false,
        viewsCount: 1,
        fraudScore: Math.floor(Math.random() * 15),
        matchPercentage: 88,
        matchReasons: ['Newly listed matching property'],
        createdAt: new Date().toISOString(),
      };
      list.unshift(newProperty);
      saveProperties(list);
      return newProperty;
    }
    const response = await api.post('/properties', propertyData);
    return response.data?.data || response.data;
  },

  async updateProperty(id, propertyData) {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 400));
      const list = getStoredProperties();
      const index = list.findIndex((p) => p.id === id);
      if (index === -1) throw new Error('Property not found');
      list[index] = { ...list[index], ...propertyData };
      saveProperties(list);
      return list[index];
    }
    const response = await api.put(`/properties/${id}`, propertyData);
    return response.data?.data || response.data;
  },

  async deleteProperty(id) {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 300));
      const list = getStoredProperties();
      const filtered = list.filter((p) => p.id !== id);
      saveProperties(filtered);
      return { success: true, id };
    }
    const response = await api.delete(`/properties/${id}`);
    return response.data?.data || response.data;
  },

  async getNearbyProperties({ lat, lng, radius = 25 }) {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 200));
      const list = getStoredProperties();
      return list.filter((p) => p.coordinates);
    }
    const response = await api.get('/properties/nearby', {
      params: { lat, lng, radius },
    });
    return response.data?.data || response.data;
  },

  async getPropertyAnalytics(id) {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 300));
      return {
        propertyId: id,
        totalViews: 1420,
        weeklyViews: [
          { day: 'Mon', views: 120, inquiries: 4 },
          { day: 'Tue', views: 180, inquiries: 6 },
          { day: 'Wed', views: 240, inquiries: 9 },
          { day: 'Thu', views: 210, inquiries: 5 },
          { day: 'Fri', views: 320, inquiries: 11 },
          { day: 'Sat', views: 450, inquiries: 18 },
          { day: 'Sun', views: 490, inquiries: 22 },
        ],
        conversionRate: 4.8,
        inquiryCount: 42,
        visitRequests: 16,
        favoritesCount: 89,
        demographics: [
          { group: '25-34 yrs', percentage: 45 },
          { group: '35-44 yrs', percentage: 38 },
          { group: '45+ yrs', percentage: 17 },
        ],
      };
    }
    const response = await api.get(`/properties/${id}/analytics`);
    return response.data?.data || response.data;
  },
};
