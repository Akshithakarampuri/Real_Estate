package com.estateai.dto;

import com.estateai.model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {

    private String id;
    private String name;
    private String email;
    private String phone;
    private Role role;
    private String profileImage;
    private String avatar;
    private String status;
    private boolean isVerified;
    private boolean isBlocked;
    private Instant createdAt;
}
