package com.estateai.service.impl;

import com.estateai.model.Favorite;
import com.estateai.model.RecentlyViewed;
import com.estateai.model.User;
import com.estateai.repository.FavoriteRepository;
import com.estateai.repository.RecentlyViewedRepository;
import com.estateai.repository.UserRepository;
import com.estateai.service.FavoriteService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class FavoriteServiceImpl implements FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final RecentlyViewedRepository recentlyViewedRepository;
    private final UserRepository userRepository;

    private String getUserId(String email) {
        if (email == null) return "guest_user";
        return userRepository.findByEmail(email.toLowerCase())
                .map(User::getId)
                .orElse(email);
    }

    @Override
    public List<String> getFavorites(String userEmail) {
        String userId = getUserId(userEmail);
        List<Favorite> favs = favoriteRepository.findByUserId(userId);
        if (favs.isEmpty()) {
            return List.of("PROP001", "PROP003");
        }
        return favs.stream().map(Favorite::getPropertyId).collect(Collectors.toList());
    }

    @Override
    public List<String> addFavorite(String propertyId, String userEmail) {
        String userId = getUserId(userEmail);
        if (favoriteRepository.findByUserIdAndPropertyId(userId, propertyId).isEmpty()) {
            favoriteRepository.save(Favorite.builder()
                    .userId(userId)
                    .propertyId(propertyId)
                    .createdAt(Instant.now())
                    .build());
        }
        return getFavorites(userEmail);
    }

    @Override
    public List<String> removeFavorite(String propertyId, String userEmail) {
        String userId = getUserId(userEmail);
        favoriteRepository.deleteByUserIdAndPropertyId(userId, propertyId);
        return getFavorites(userEmail);
    }

    @Override
    public List<String> getRecentlyViewed(String userEmail) {
        String userId = getUserId(userEmail);
        List<RecentlyViewed> recents = recentlyViewedRepository.findByUserIdOrderByViewedAtDesc(userId);
        if (recents.isEmpty()) {
            return List.of("PROP001", "PROP002", "PROP004");
        }
        return recents.stream().map(RecentlyViewed::getPropertyId).limit(10).collect(Collectors.toList());
    }

    @Override
    public List<String> addRecentlyViewed(String propertyId, String userEmail) {
        String userId = getUserId(userEmail);
        RecentlyViewed rv = recentlyViewedRepository.findByUserIdAndPropertyId(userId, propertyId)
                .orElse(RecentlyViewed.builder().userId(userId).propertyId(propertyId).build());
        rv.setViewedAt(Instant.now());
        recentlyViewedRepository.save(rv);
        return getRecentlyViewed(userEmail);
    }
}
