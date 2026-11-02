package com.estateai.service.impl;

import com.estateai.dto.AuthResponse;
import com.estateai.dto.LoginRequest;
import com.estateai.dto.RegisterRequest;
import com.estateai.dto.UserResponse;
import com.estateai.exception.BadRequestException;
import com.estateai.exception.DuplicateResourceException;
import com.estateai.exception.ResourceNotFoundException;
import com.estateai.exception.UnauthorizedException;
import com.estateai.model.Role;
import com.estateai.model.User;
import com.estateai.repository.UserRepository;
import com.estateai.security.JwtService;
import com.estateai.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Override
    public AuthResponse register(RegisterRequest request) {
        log.info("Processing registration request for email: {}", request.getEmail());

        if (request.getRole() == Role.ADMIN) {
            log.warn("Blocked attempt to register directly with ADMIN role: {}", request.getEmail());
            throw new BadRequestException("Registration as ADMIN is not allowed through the public API");
        }

        String normalizedEmail = request.getEmail().trim().toLowerCase();

        if (userRepository.existsByEmail(normalizedEmail)) {
            log.warn("Registration failed. Email already exists: {}", normalizedEmail);
            throw new DuplicateResourceException("An account with email " + request.getEmail() + " already exists");
        }

        String defaultAvatar = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80";

        User user = User.builder()
                .name(request.getName().trim())
                .email(normalizedEmail)
                .phone(request.getPhone() != null ? request.getPhone().trim() : null)
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .profileImage(defaultAvatar)
                .avatar(defaultAvatar)
                .status("active")
                .isVerified(true)
                .isBlocked(false)
                .build();

        User savedUser = userRepository.save(user);
        log.info("User registered successfully with ID: {}", savedUser.getId());

        String token = jwtService.generateToken(savedUser);

        return AuthResponse.builder()
                .token(token)
                .user(mapToUserResponse(savedUser))
                .build();
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        String normalizedEmail = request.getEmail().trim().toLowerCase();
        log.info("Processing login request for email: {}", normalizedEmail);

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(normalizedEmail, request.getPassword())
            );
        } catch (Exception ex) {
            log.warn("Authentication failed for user: {}", normalizedEmail);
            throw new UnauthorizedException("Invalid email or password");
        }

        User user = userRepository.findByEmail(normalizedEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + normalizedEmail));

        if (user.isBlocked() || "blocked".equalsIgnoreCase(user.getStatus())) {
            log.warn("Blocked user login attempt: {}", normalizedEmail);
            throw new UnauthorizedException("Your account is suspended. Please contact customer support.");
        }

        log.info("User logged in successfully: {}", normalizedEmail);
        String token = jwtService.generateToken(user);

        return AuthResponse.builder()
                .token(token)
                .user(mapToUserResponse(user))
                .build();
    }

    @Override
    public UserResponse getCurrentUser(String email) {
        log.debug("Fetching current user profile for email: {}", email);
        String normalizedEmail = email.trim().toLowerCase();

        User user = userRepository.findByEmail(normalizedEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        return mapToUserResponse(user);
    }

    @Override
    public Map<String, String> forgotPassword(String email) {
        log.info("Forgot password request for: {}", email);
        return Map.of("message", "Password reset instructions have been sent to your email.");
    }

    @Override
    public Map<String, String> resetPassword(String token, String newPassword) {
        log.info("Reset password request with token: {}", token);
        return Map.of("message", "Your password has been successfully reset.");
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
