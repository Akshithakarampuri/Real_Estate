package com.estateai.service.impl;

import com.estateai.dto.PropertyAnalyticsResponse;
import com.estateai.dto.PropertyPageResponse;
import com.estateai.exception.ResourceNotFoundException;
import com.estateai.model.Property;
import com.estateai.model.User;
import com.estateai.repository.PropertyRepository;
import com.estateai.repository.UserRepository;
import com.estateai.service.PropertyService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class PropertyServiceImpl implements PropertyService {

    private final PropertyRepository propertyRepository;
    private final UserRepository userRepository;

    @Override
    public PropertyPageResponse getProperties(
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
    ) {
        List<Property> all = propertyRepository.findAll();

        List<Property> filtered = all.stream().filter(p -> {
            if (location != null && !location.isBlank() && !"All".equalsIgnoreCase(location)) {
                String loc = location.toLowerCase();
                boolean matchesCity = p.getCity() != null && p.getCity().toLowerCase().contains(loc);
                boolean matchesLoc = p.getLocation() != null && p.getLocation().toLowerCase().contains(loc);
                if (!matchesCity && !matchesLoc) return false;
            }

            if (propertyType != null && !propertyType.isBlank() && !"All".equalsIgnoreCase(propertyType)) {
                if (p.getPropertyType() == null || !p.getPropertyType().equalsIgnoreCase(propertyType)) {
                    return false;
                }
            }

            if (bhk != null && bhk > 0) {
                if (p.getBhk() == null || !p.getBhk().equals(bhk)) {
                    return false;
                }
            }

            if (minPrice != null && minPrice > 0) {
                if (p.getPrice() == null || p.getPrice() < minPrice) {
                    return false;
                }
            }

            if (maxPrice != null && maxPrice > 0) {
                if (p.getPrice() == null || p.getPrice() > maxPrice) {
                    return false;
                }
            }

            if (minArea != null && minArea > 0) {
                if (p.getArea() == null || p.getArea() < minArea) {
                    return false;
                }
            }

            if (maxArea != null && maxArea > 0) {
                if (p.getArea() == null || p.getArea() > maxArea) {
                    return false;
                }
            }

            if (furnishing != null && !furnishing.isBlank() && !"All".equalsIgnoreCase(furnishing)) {
                if (p.getFurnishing() == null || !p.getFurnishing().equalsIgnoreCase(furnishing)) {
                    return false;
                }
            }

            if (possession != null && !possession.isBlank() && !"All".equalsIgnoreCase(possession)) {
                if (p.getPossession() == null || !p.getPossession().equalsIgnoreCase(possession)) {
                    return false;
                }
            }

            if (Boolean.TRUE.equals(verifiedOnly)) {
                if (!p.isVerified()) {
                    return false;
                }
            }

            if (amenities != null && !amenities.isEmpty()) {
                if (p.getAmenities() == null) return false;
                for (String reqAmenity : amenities) {
                    boolean found = p.getAmenities().stream()
                            .anyMatch(a -> a.toLowerCase().contains(reqAmenity.toLowerCase()));
                    if (!found) return false;
                }
            }

            return true;
        }).collect(Collectors.toList());

        // Sort
        if ("price_asc".equalsIgnoreCase(sort)) {
            filtered.sort(Comparator.comparing(p -> p.getPrice() != null ? p.getPrice() : 0L));
        } else if ("price_desc".equalsIgnoreCase(sort)) {
            filtered.sort((a, b) -> Long.compare(b.getPrice() != null ? b.getPrice() : 0L, a.getPrice() != null ? a.getPrice() : 0L));
        } else if ("views".equalsIgnoreCase(sort)) {
            filtered.sort((a, b) -> Long.compare(b.getViewsCount(), a.getViewsCount()));
        } else if ("newest".equalsIgnoreCase(sort)) {
            filtered.sort((a, b) -> Integer.compare(
                    b.getConstructionYear() != null ? b.getConstructionYear() : 2020,
                    a.getConstructionYear() != null ? a.getConstructionYear() : 2020
            ));
        } else if ("recommended".equalsIgnoreCase(sort)) {
            filtered.sort((a, b) -> Integer.compare(b.getMatchPercentage(), a.getMatchPercentage()));
        }

        int currentPage = (page != null && page > 0) ? page : 1;
        int pageSize = (limit != null && limit > 0) ? limit : 9;
        int total = filtered.size();
        int totalPages = (int) Math.ceil((double) total / pageSize);
        if (totalPages == 0) totalPages = 1;

        int fromIndex = (currentPage - 1) * pageSize;
        List<Property> paginated;
        if (fromIndex >= total) {
            paginated = Collections.emptyList();
        } else {
            int toIndex = Math.min(fromIndex + pageSize, total);
            paginated = filtered.subList(fromIndex, toIndex);
        }

        return PropertyPageResponse.builder()
                .properties(paginated)
                .total(total)
                .page(currentPage)
                .totalPages(totalPages)
                .build();
    }

    @Override
    public Property getPropertyById(String id) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found with ID: " + id));

        property.setViewsCount(property.getViewsCount() + 1);
        return propertyRepository.save(property);
    }

    @Override
    public Property createProperty(Property property, String userEmail) {
        if (property.getId() == null || property.getId().isBlank()) {
            property.setId("PROP" + String.format("%03d", propertyRepository.count() + 1));
        }

        if (userEmail != null) {
            userRepository.findByEmail(userEmail.toLowerCase()).ifPresent(user -> {
                property.setSellerId(user.getId());
                property.setSellerName(user.getName());
                property.setSellerEmail(user.getEmail());
                property.setSellerPhone(user.getPhone());
                property.setSellerType(user.getRole() != null ? user.getRole().name() : "Owner");
            });
        }

        if (property.getStatus() == null) property.setStatus("pending");
        if (property.getViewsCount() == 0) property.setViewsCount(1);
        if (property.getMatchPercentage() == 0) property.setMatchPercentage(88);
        if (property.getMatchReasons() == null || property.getMatchReasons().isEmpty()) {
            property.setMatchReasons(List.of("Newly listed matching property"));
        }
        if (property.getCreatedAt() == null) property.setCreatedAt(Instant.now());

        log.info("Creating property: {} with title: {}", property.getId(), property.getTitle());
        return propertyRepository.save(property);
    }

    @Override
    public Property updateProperty(String id, Property property, String userEmail) {
        Property existing = getPropertyById(id);

        if (property.getTitle() != null) existing.setTitle(property.getTitle());
        if (property.getDescription() != null) existing.setDescription(property.getDescription());
        if (property.getPrice() != null) existing.setPrice(property.getPrice());
        if (property.getPropertyType() != null) existing.setPropertyType(property.getPropertyType());
        if (property.getLocation() != null) existing.setLocation(property.getLocation());
        if (property.getCity() != null) existing.setCity(property.getCity());
        if (property.getState() != null) existing.setState(property.getState());
        if (property.getBhk() != null) existing.setBhk(property.getBhk());
        if (property.getBathrooms() != null) existing.setBathrooms(property.getBathrooms());
        if (property.getArea() != null) existing.setArea(property.getArea());
        if (property.getFurnishing() != null) existing.setFurnishing(property.getFurnishing());
        if (property.getPossession() != null) existing.setPossession(property.getPossession());
        if (property.getAmenities() != null) existing.setAmenities(property.getAmenities());
        if (property.getImages() != null) existing.setImages(property.getImages());
        if (property.getCoordinates() != null) existing.setCoordinates(property.getCoordinates());
        if (property.getStatus() != null) existing.setStatus(property.getStatus());
        existing.setUpdatedAt(Instant.now());

        log.info("Updated property: {}", id);
        return propertyRepository.save(existing);
    }

    @Override
    public void deleteProperty(String id, String userEmail) {
        log.info("Deleting property: {}", id);
        propertyRepository.deleteById(id);
    }

    @Override
    public List<Property> getNearbyProperties(Double lat, Double lng, Double radius) {
        return propertyRepository.findAll().stream()
                .filter(p -> p.getCoordinates() != null && p.getCoordinates().getLat() != null && p.getCoordinates().getLng() != null)
                .collect(Collectors.toList());
    }

    @Override
    public PropertyAnalyticsResponse getPropertyAnalytics(String id) {
        Property property = propertyRepository.findById(id).orElse(null);
        long totalViews = property != null ? Math.max(property.getViewsCount(), 1420L) : 1420L;

        List<Map<String, Object>> weeklyViews = List.of(
                Map.of("day", "Mon", "views", 120, "inquiries", 4),
                Map.of("day", "Tue", "views", 180, "inquiries", 6),
                Map.of("day", "Wed", "views", 240, "inquiries", 9),
                Map.of("day", "Thu", "views", 210, "inquiries", 5),
                Map.of("day", "Fri", "views", 320, "inquiries", 11),
                Map.of("day", "Sat", "views", 450, "inquiries", 18),
                Map.of("day", "Sun", "views", 490, "inquiries", 22)
        );

        List<Map<String, Object>> demographics = List.of(
                Map.of("group", "25-34 yrs", "percentage", 45),
                Map.of("group", "35-44 yrs", "percentage", 38),
                Map.of("group", "45+ yrs", "percentage", 17)
        );

        return PropertyAnalyticsResponse.builder()
                .propertyId(id)
                .totalViews(totalViews)
                .weeklyViews(weeklyViews)
                .conversionRate(4.8)
                .inquiryCount(42)
                .visitRequests(16)
                .favoritesCount(89)
                .demographics(demographics)
                .build();
    }
}
