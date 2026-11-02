package com.estateai.service;

import com.estateai.dto.UserResponse;
import com.estateai.model.Property;

import java.util.List;
import java.util.Map;

public interface AdminService {

    List<UserResponse> getUsers(String role, String search);

    UserResponse updateUserStatus(String userId, String status);

    List<Property> getPendingProperties();

    Property verifyProperty(String propertyId, boolean verified, String rejectionReason);

    List<Map<String, Object>> getFraudFlags();

    Map<String, Object> getPlatformAnalytics();
}
