package com.estateai.service;

import java.util.List;

public interface FavoriteService {

    List<String> getFavorites(String userEmail);

    List<String> addFavorite(String propertyId, String userEmail);

    List<String> removeFavorite(String propertyId, String userEmail);

    List<String> getRecentlyViewed(String userEmail);

    List<String> addRecentlyViewed(String propertyId, String userEmail);
}
