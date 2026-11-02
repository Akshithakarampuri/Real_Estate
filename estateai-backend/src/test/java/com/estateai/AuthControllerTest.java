package com.estateai;

import com.estateai.controller.AuthController;
import com.estateai.dto.AuthResponse;
import com.estateai.dto.LoginRequest;
import com.estateai.dto.RegisterRequest;
import com.estateai.dto.UserResponse;
import com.estateai.exception.BadRequestException;
import com.estateai.exception.DuplicateResourceException;
import com.estateai.model.Role;
import com.estateai.security.JwtService;
import com.estateai.service.AuthService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AuthController.class)
@AutoConfigureMockMvc(addFilters = false)
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private AuthService authService;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private UserDetailsService userDetailsService;

    @Test
    void testRegisterSuccess() throws Exception {
        RegisterRequest req = RegisterRequest.builder()
                .name("Kavitha Reddy")
                .email("kavitha@estateai.com")
                .phone("+919876543210")
                .password("Password123")
                .role(Role.SELLER)
                .build();

        AuthResponse authRes = AuthResponse.builder()
                .token("mocked.jwt.token")
                .user(UserResponse.builder()
                        .id("101")
                        .name("Kavitha Reddy")
                        .email("kavitha@estateai.com")
                        .role(Role.SELLER)
                        .build())
                .build();

        when(authService.register(any(RegisterRequest.class))).thenReturn(authRes);

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.token").value("mocked.jwt.token"))
                .andExpect(jsonPath("$.data.user.name").value("Kavitha Reddy"));
    }

    @Test
    void testRegisterValidationError() throws Exception {
        RegisterRequest req = RegisterRequest.builder()
                .name("") // empty name
                .email("invalid-email")
                .phone("123") // too short
                .password("short") // less than 8 chars
                .role(null)
                .build();

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value(400))
                .andExpect(jsonPath("$.message").value("Validation failed"))
                .andExpect(jsonPath("$.errors.name").exists())
                .andExpect(jsonPath("$.errors.email").exists())
                .andExpect(jsonPath("$.errors.password").exists());
    }

    @Test
    void testRegisterAdminForbidden() throws Exception {
        RegisterRequest req = RegisterRequest.builder()
                .name("Admin User")
                .email("admin@estateai.com")
                .phone("+919876543210")
                .password("AdminSecurePassword123")
                .role(Role.ADMIN)
                .build();

        when(authService.register(any(RegisterRequest.class)))
                .thenThrow(new BadRequestException("Registration as ADMIN is not allowed through the public API"));

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Registration as ADMIN is not allowed through the public API"));
    }

    @Test
    void testLoginSuccess() throws Exception {
        LoginRequest req = LoginRequest.builder()
                .email("kavitha@estateai.com")
                .password("Password123")
                .build();

        AuthResponse authRes = AuthResponse.builder()
                .token("mocked.jwt.token")
                .user(UserResponse.builder()
                        .id("101")
                        .name("Kavitha Reddy")
                        .email("kavitha@estateai.com")
                        .role(Role.SELLER)
                        .build())
                .build();

        when(authService.login(any(LoginRequest.class))).thenReturn(authRes);

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.token").value("mocked.jwt.token"));
    }
}
