import React, { createContext, useContext, useState, useEffect } from 'react';
import { favoriteService } from '../services/favoriteService';
import { useToast } from './ToastContext';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const { success, info } = useToast();
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('estateiq_favorites');
    return saved ? JSON.parse(saved) : ['PROP001', 'PROP003'];
  });
  const [compareList, setCompareList] = useState(() => {
    const saved = localStorage.getItem('estateiq_compare');
    return saved ? JSON.parse(saved) : ['PROP001', 'PROP002'];
  });
  const [currency, setCurrency] = useState('INR');

  useEffect(() => {
    localStorage.setItem('estateiq_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('estateiq_compare', JSON.stringify(compareList));
  }, [compareList]);

  const toggleFavorite = async (propertyId, propertyTitle = 'Property') => {
    if (favorites.includes(propertyId)) {
      setFavorites((prev) => prev.filter((id) => id !== propertyId));
      await favoriteService.removeFavorite(propertyId);
      info(`Removed ${propertyTitle} from favorites`);
    } else {
      setFavorites((prev) => [...prev, propertyId]);
      await favoriteService.addFavorite(propertyId);
      success(`Saved ${propertyTitle} to favorites!`);
    }
  };

  const isFavorite = (propertyId) => favorites.includes(propertyId);

  const addToCompare = (propertyId, propertyTitle = 'Property') => {
    if (compareList.includes(propertyId)) {
      info(`${propertyTitle} is already in the comparison list.`);
      return;
    }
    if (compareList.length >= 4) {
      info('You can compare up to 4 properties simultaneously.');
      return;
    }
    setCompareList((prev) => [...prev, propertyId]);
    success(`Added ${propertyTitle} to compare!`);
  };

  const removeFromCompare = (propertyId) => {
    setCompareList((prev) => prev.filter((id) => id !== propertyId));
  };

  const isInCompare = (propertyId) => compareList.includes(propertyId);

  const clearCompare = () => setCompareList([]);

  const value = {
    favorites,
    toggleFavorite,
    isFavorite,
    compareList,
    addToCompare,
    removeFromCompare,
    isInCompare,
    clearCompare,
    currency,
    setCurrency,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
