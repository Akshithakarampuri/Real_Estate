package com.estateai.controller;

import com.estateai.dto.PropertyAnalyticsResponse;
import com.estateai.dto.PropertyPageResponse;
import com.estateai.model.Property;
import com.estateai.service.PropertyService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/properties")
@RequiredArgsConstructor
@Slf4j
public class PropertyController {

    private final PropertyService propertyService;

    @GetMapping
    public ResponseEntity<PropertyPageResponse> getProperties(
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String propertyType,
            @RequestParam(required = false) String bhk,
            @RequestParam(required = false) String minPrice,
            @RequestParam(required = false) String maxPrice,
            @RequestParam(required = false) String minArea,
            @RequestParam(required = false) String maxArea,
            @RequestParam(required = false) String furnishing,
            @RequestParam(required = false) String possession,
            @RequestParam(required = false) Boolean verifiedOnly,
            @RequestParam(required = false) List<String> amenities,
            @RequestParam(required = false, defaultValue = "recommended") String sort,
            @RequestParam(required = false, defaultValue = "1") Integer page,
            @RequestParam(required = false, defaultValue = "9") Integer limit
    ) {
        Integer parsedBhk = parseInteger(bhk);
        Long parsedMinPrice = parseLong(minPrice);
        Long parsedMaxPrice = parseLong(maxPrice);
        Integer parsedMinArea = parseInteger(minArea);
        Integer parsedMaxArea = parseInteger(maxArea);

        log.info("Fetching properties query: location={}, type={}, bhk={}, sort={}, page={}", location, propertyType, parsedBhk, sort, page);
        PropertyPageResponse result = propertyService.getProperties(
                location, propertyType, parsedBhk, parsedMinPrice, parsedMaxPrice,
                parsedMinArea, parsedMaxArea, furnishing, possession, verifiedOnly,
                amenities, sort, page, limit
        );
        return ResponseEntity.ok(result);
    }

    private Integer parseInteger(String val) {
        if (val == null || val.isBlank() || "All".equalsIgnoreCase(val.trim())) return null;
        try {
            return Integer.parseInt(val.trim());
        } catch (NumberFormatException e) {
            return null;
        }
    }

    private Long parseLong(String val) {
        if (val == null || val.isBlank() || "All".equalsIgnoreCase(val.trim())) return null;
        try {
            return Long.parseLong(val.trim());
        } catch (NumberFormatException e) {
            return null;
        }
    }

    @GetMapping("/nearby")
    public ResponseEntity<List<Property>> getNearbyProperties(
            @RequestParam(required = false) Double lat,
            @RequestParam(required = false) Double lng,
            @RequestParam(required = false, defaultValue = "25") Double radius
    ) {
        log.info("Fetching nearby properties for lat={}, lng={}, radius={}", lat, lng, radius);
        return ResponseEntity.ok(propertyService.getNearbyProperties(lat, lng, radius));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Property> getPropertyById(@PathVariable String id) {
        log.info("Fetching property by id: {}", id);
        return ResponseEntity.ok(propertyService.getPropertyById(id));
    }

    @GetMapping("/{id}/analytics")
    public ResponseEntity<PropertyAnalyticsResponse> getPropertyAnalytics(@PathVariable String id) {
        log.info("Fetching analytics for property: {}", id);
        return ResponseEntity.ok(propertyService.getPropertyAnalytics(id));
    }

    @PostMapping
    public ResponseEntity<Property> createProperty(
            @RequestBody Property property,
            Authentication authentication
    ) {
        String email = authentication != null ? authentication.getName() : null;
        log.info("Creating property by user: {}", email);
        Property created = propertyService.createProperty(property, email);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Property> updateProperty(
            @PathVariable String id,
            @RequestBody Property property,
            Authentication authentication
    ) {
        String email = authentication != null ? authentication.getName() : null;
        log.info("Updating property {} by user: {}", id, email);
        return ResponseEntity.ok(propertyService.updateProperty(id, property, email));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteProperty(
            @PathVariable String id,
            Authentication authentication
    ) {
        String email = authentication != null ? authentication.getName() : null;
        log.info("Deleting property {} by user: {}", id, email);
        propertyService.deleteProperty(id, email);
        return ResponseEntity.ok(Map.of("success", true, "id", id));
    }
}
