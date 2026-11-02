package com.estateai.controller;

import com.estateai.dto.UserResponse;
import com.estateai.model.Property;
import com.estateai.service.AdminService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@Slf4j
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/users")
    public ResponseEntity<List<UserResponse>> getUsers(
            @RequestParam(required = false) String role,
            @RequestParam(required = false) String search
    ) {
        log.info("Admin fetching users with role={}, search={}", role, search);
        return ResponseEntity.ok(adminService.getUsers(role, search));
    }

    @PutMapping("/users/{userId}/status")
    public ResponseEntity<UserResponse> updateUserStatus(
            @PathVariable String userId,
            @RequestBody Map<String, String> body
    ) {
        String status = body.get("status");
        log.info("Admin updating user {} status to {}", userId, status);
        return ResponseEntity.ok(adminService.updateUserStatus(userId, status));
    }

    @GetMapping("/properties/pending")
    public ResponseEntity<List<Property>> getPendingProperties() {
        log.info("Admin fetching pending properties");
        return ResponseEntity.ok(adminService.getPendingProperties());
    }

    @PutMapping("/properties/{propertyId}/verify")
    public ResponseEntity<Property> verifyProperty(
            @PathVariable String propertyId,
            @RequestBody Map<String, Object> body
    ) {
        boolean verified = Boolean.TRUE.equals(body.get("verified"));
        String rejectionReason = (String) body.get("rejectionReason");
        log.info("Admin verifying property {}: verified={}", propertyId, verified);
        return ResponseEntity.ok(adminService.verifyProperty(propertyId, verified, rejectionReason));
    }

    @GetMapping("/fraud-flags")
    public ResponseEntity<List<Map<String, Object>>> getFraudFlags() {
        return ResponseEntity.ok(adminService.getFraudFlags());
    }

    @GetMapping("/analytics")
    public ResponseEntity<Map<String, Object>> getPlatformAnalytics() {
        return ResponseEntity.ok(adminService.getPlatformAnalytics());
    }
}
