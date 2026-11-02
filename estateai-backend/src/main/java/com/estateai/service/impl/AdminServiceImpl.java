package com.estateai.service.impl;

import com.estateai.dto.UserResponse;
import com.estateai.exception.ResourceNotFoundException;
import com.estateai.model.Property;
import com.estateai.model.Role;
import com.estateai.model.User;
import com.estateai.repository.PropertyRepository;
import com.estateai.repository.UserRepository;
import com.estateai.service.AdminService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class AdminServiceImpl implements AdminService {

    private final UserRepository userRepository;
    private final PropertyRepository propertyRepository;

    @Override
    public List<UserResponse> getUsers(String role, String search) {
        List<User> users = userRepository.findAll();

        return users.stream().filter(u -> {
            if (role != null && !role.isBlank() && !"all".equalsIgnoreCase(role)) {
                if (u.getRole() == null || !u.getRole().name().equalsIgnoreCase(role)) {
                    return false;
                }
            }
            if (search != null && !search.isBlank()) {
                String s = search.toLowerCase();
                boolean matchesName = u.getName() != null && u.getName().toLowerCase().contains(s);
                boolean matchesEmail = u.getEmail() != null && u.getEmail().toLowerCase().contains(s);
                if (!matchesName && !matchesEmail) return false;
            }
            return true;
        }).map(this::mapToUserResponse).collect(Collectors.toList());
    }

    @Override
    public UserResponse updateUserStatus(String userId, String status) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userId));

        user.setStatus(status);
        user.setBlocked("blocked".equalsIgnoreCase(status));
        User saved = userRepository.save(user);
        log.info("Admin updated user {} status to {}", userId, status);
        return mapToUserResponse(saved);
    }

    @Override
    public List<Property> getPendingProperties() {
        return propertyRepository.findAll().stream()
                .filter(p -> "pending".equalsIgnoreCase(p.getStatus()) || !p.isVerified())
                .collect(Collectors.toList());
    }

    @Override
    public Property verifyProperty(String propertyId, boolean verified, String rejectionReason) {
        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found: " + propertyId));

        property.setVerified(verified);
        property.setStatus(verified ? "active" : "rejected");
        if (!verified) {
            property.setRejectionReason(rejectionReason);
        } else {
            property.setRejectionReason(null);
        }

        log.info("Admin verified property {}: verified={}, reason={}", propertyId, verified, rejectionReason);
        return propertyRepository.save(property);
    }

    @Override
    public List<Map<String, Object>> getFraudFlags() {
        Map<String, Object> flag1 = new LinkedHashMap<>();
        flag1.put("id", "FLG-801");
        flag1.put("propertyId", "PROP008");
        flag1.put("propertyTitle", "Suspicious Low-Price Bandra Flat (Audit Flagged)");
        flag1.put("sellerName", "Suspicious Seller X");
        flag1.put("sellerPhone", "+91 90000 00000");
        flag1.put("price", 3500000);
        flag1.put("marketAverage", 18500000);
        flag1.put("fraudScore", 88);
        flag1.put("riskLevel", "CRITICAL");
        flag1.put("reason", "Severe Price Undercut (78% below circle rate) & VoIP Phone identity mismatch");
        flag1.put("status", "Under Review");

        Map<String, Object> flag2 = new LinkedHashMap<>();
        flag2.put("id", "FLG-802");
        flag2.put("propertyId", "PROP006");
        flag2.put("propertyTitle", "Koregaon Park Riverside 3BHK");
        flag2.put("sellerName", "Aarav Oberoi");
        flag2.put("sellerPhone", "+91 98211 99887");
        flag2.put("price", 14500000);
        flag2.put("marketAverage", 14000000);
        flag2.put("fraudScore", 22);
        flag2.put("riskLevel", "LOW");
        flag2.put("reason", "Duplicate interior image detected in Bangalore listing database");
        flag2.put("status", "Cleared");

        return List.of(flag1, flag2);
    }

    @Override
    public Map<String, Object> getPlatformAnalytics() {
        long totalUsers = Math.max(userRepository.count(), 14820L);
        long totalProperties = Math.max(propertyRepository.count(), 3450L);

        Map<String, Object> analytics = new LinkedHashMap<>();
        analytics.put("totalUsers", totalUsers);
        analytics.put("buyersCount", 11240);
        analytics.put("sellersCount", 2680);
        analytics.put("agentsCount", 900);
        analytics.put("totalProperties", totalProperties);
        analytics.put("pendingVerificationCount", 14);
        analytics.put("criticalFraudAlerts", 2);
        analytics.put("monthlyGrowthPercent", 18.4);
        analytics.put("userGrowthData", List.of(
                Map.of("month", "Apr", "users", 11200, "listings", 2800),
                Map.of("month", "May", "users", 12100, "listings", 2950),
                Map.of("month", "Jun", "users", 12900, "listings", 3100),
                Map.of("month", "Jul", "users", 13600, "listings", 3250),
                Map.of("month", "Aug", "users", 14200, "listings", 3380),
                Map.of("month", "Sep", "users", 14820, "listings", 3450)
        ));
        analytics.put("regionalDistribution", List.of(
                Map.of("region", "Mumbai MMR", "count", 1120),
                Map.of("region", "Bengaluru Tech", "count", 980),
                Map.of("region", "Hyderabad Cyber", "count", 640),
                Map.of("region", "Delhi NCR", "count", 480),
                Map.of("region", "Pune & Goa", "count", 230)
        ));

        return analytics;
    }

    private UserResponse mapToUserResponse(User user) {
        String avatar = user.getAvatar() != null ? user.getAvatar() : user.getProfileImage();
        if (avatar == null) {
            avatar = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80";
        }

        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .role(user.getRole())
                .profileImage(avatar)
                .avatar(avatar)
                .status(user.getStatus() != null ? user.getStatus() : (user.isBlocked() ? "blocked" : "active"))
                .isVerified(user.isVerified())
                .isBlocked(user.isBlocked())
                .createdAt(user.getCreatedAt())
                .build();
    }
}
