package com.estateai.controller;

import com.estateai.service.FavoriteService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class FavoriteController {

    private final FavoriteService favoriteService;

    @GetMapping("/favorites")
    public ResponseEntity<List<String>> getFavorites(Authentication authentication) {
        String email = authentication != null ? authentication.getName() : null;
        log.info("Fetching favorites for: {}", email);
        return ResponseEntity.ok(favoriteService.getFavorites(email));
    }

    @PostMapping("/favorites/{propertyId}")
    public ResponseEntity<Map<String, Object>> addFavorite(
            @PathVariable String propertyId,
            Authentication authentication
    ) {
        String email = authentication != null ? authentication.getName() : null;
        log.info("Adding favorite {} for {}", propertyId, email);
        List<String> favs = favoriteService.addFavorite(propertyId, email);
        return ResponseEntity.ok(Map.of("success", true, "favorites", favs));
    }

    @DeleteMapping("/favorites/{propertyId}")
    public ResponseEntity<Map<String, Object>> removeFavorite(
            @PathVariable String propertyId,
            Authentication authentication
    ) {
        String email = authentication != null ? authentication.getName() : null;
        log.info("Removing favorite {} for {}", propertyId, email);
        List<String> favs = favoriteService.removeFavorite(propertyId, email);
        return ResponseEntity.ok(Map.of("success", true, "favorites", favs));
    }

    @GetMapping("/recently-viewed")
    public ResponseEntity<List<String>> getRecentlyViewed(Authentication authentication) {
        String email = authentication != null ? authentication.getName() : null;
        return ResponseEntity.ok(favoriteService.getRecentlyViewed(email));
    }

    @PostMapping("/recently-viewed/{propertyId}")
    public ResponseEntity<List<String>> addRecentlyViewed(
            @PathVariable String propertyId,
            Authentication authentication
    ) {
        String email = authentication != null ? authentication.getName() : null;
        return ResponseEntity.ok(favoriteService.addRecentlyViewed(propertyId, email));
    }
}
