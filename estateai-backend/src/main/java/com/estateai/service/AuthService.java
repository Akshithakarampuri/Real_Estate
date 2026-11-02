package com.estateai.service;

import com.estateai.dto.AuthResponse;
import com.estateai.dto.LoginRequest;
import com.estateai.dto.RegisterRequest;
import com.estateai.dto.UserResponse;

import java.util.Map;

public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);

    UserResponse getCurrentUser(String email);

    Map<String, String> forgotPassword(String email);

    Map<String, String> resetPassword(String token, String newPassword);
}
