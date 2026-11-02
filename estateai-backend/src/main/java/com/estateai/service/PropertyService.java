package com.estateai.service;

import com.estateai.dto.PropertyAnalyticsResponse;
import com.estateai.dto.PropertyPageResponse;
import com.estateai.model.Property;

import java.util.List;

public interface PropertyService {

    PropertyPageResponse getProperties(
            String location,
            String propertyType,
            Integer bhk,
            Long minPrice,
            Long maxPrice,
            Integer minArea,
            Integer maxArea,
            String furnishing,
            String possession,
            Boolean verifiedOnly,
            List<String> amenities,
            String sort,
            Integer page,
            Integer limit
    );

    Property getPropertyById(String id);

    Property createProperty(Property property, String userEmail);

    Property updateProperty(String id, Property property, String userEmail);

    void deleteProperty(String id, String userEmail);

    List<Property> getNearbyProperties(Double lat, Double lng, Double radius);

    PropertyAnalyticsResponse getPropertyAnalytics(String id);
}
