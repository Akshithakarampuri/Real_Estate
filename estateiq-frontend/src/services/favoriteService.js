import api from './api';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_API !== 'false';

const getStoredFavorites = () => {
  const saved = localStorage.getItem('estateiq_favorites');
  return saved ? JSON.parse(saved) : ['PROP001', 'PROP003'];
};

const saveFavorites = (ids) => {
  localStorage.setItem('estateiq_favorites', JSON.stringify(ids));
};

const getStoredRecentlyViewed = () => {
  const saved = localStorage.getItem('estateiq_recently_viewed');
  return saved ? JSON.parse(saved) : ['PROP001', 'PROP002', 'PROP004'];
};

const saveRecentlyViewed = (ids) => {
  localStorage.setItem('estateiq_recently_viewed', JSON.stringify(ids));
};

export const favoriteService = {
  async getFavorites() {
    if (USE_MOCK) {
      return getStoredFavorites();
    }
    const response = await api.get('/favorites');
    const res = response.data?.data || response.data;
    return Array.isArray(res) ? res : (res?.favorites || []);
  },

  async addFavorite(propertyId) {
    if (USE_MOCK) {
      const favs = getStoredFavorites();
      if (!favs.includes(propertyId)) {
        favs.push(propertyId);
        saveFavorites(favs);
      }
      return { success: true, favorites: favs };
    }
    const response = await api.post(`/favorites/${propertyId}`);
    return response.data?.data || response.data;
  },

  async removeFavorite(propertyId) {
    if (USE_MOCK) {
      let favs = getStoredFavorites();
      favs = favs.filter((id) => id !== propertyId);
      saveFavorites(favs);
      return { success: true, favorites: favs };
    }
    const response = await api.delete(`/favorites/${propertyId}`);
    return response.data?.data || response.data;
  },

  async getRecentlyViewed() {
    if (USE_MOCK) {
      return getStoredRecentlyViewed();
    }
    const response = await api.get('/recently-viewed');
    const res = response.data?.data || response.data;
    return Array.isArray(res) ? res : [];
  },

  async addRecentlyViewed(propertyId) {
    if (USE_MOCK) {
      let recent = getStoredRecentlyViewed();
      recent = [propertyId, ...recent.filter((id) => id !== propertyId)].slice(0, 10);
      saveRecentlyViewed(recent);
      return recent;
    }
    const response = await api.post(`/recently-viewed/${propertyId}`);
    return response.data?.data || response.data;
  },
};
