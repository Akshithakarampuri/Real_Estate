package com.estateai;

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
import com.estateai.service.impl.AuthServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @Mock
    private AuthenticationManager authenticationManager;

    @InjectMocks
    private AuthServiceImpl authService;

    private RegisterRequest registerRequest;
    private LoginRequest loginRequest;
    private User testUser;

    @BeforeEach
    void setUp() {
        registerRequest = RegisterRequest.builder()
                .name("Arjun Rao")
                .email("arjun@estateai.com")
                .phone("+919876543210")
                .password("SecurePass123")
                .role(Role.BUYER)
                .build();

        loginRequest = LoginRequest.builder()
                .email("arjun@estateai.com")
                .password("SecurePass123")
                .build();

        testUser = User.builder()
                .id("u1")
                .name("Arjun Rao")
                .email("arjun@estateai.com")
                .phone("+919876543210")
                .password("encoded_pass")
                .role(Role.BUYER)
                .isBlocked(false)
                .isVerified(false)
                .build();
    }

    @Test
    void testRegisterSuccess() {
        when(userRepository.existsByEmail("arjun@estateai.com")).thenReturn(false);
        when(passwordEncoder.encode("SecurePass123")).thenReturn("encoded_pass");
        when(userRepository.save(any(User.class))).thenReturn(testUser);
        when(jwtService.generateToken(testUser)).thenReturn("jwt.token.mock");

        AuthResponse response = authService.register(registerRequest);

        assertNotNull(response);
        assertEquals("jwt.token.mock", response.getToken());
        assertEquals("Arjun Rao", response.getUser().getName());
        assertEquals(Role.BUYER, response.getUser().getRole());
        verify(userRepository).save(any(User.class));
    }

    @Test
    void testRegisterAdminRoleRejected() {
        registerRequest.setRole(Role.ADMIN);

        BadRequestException ex = assertThrows(BadRequestException.class, () -> authService.register(registerRequest));
        assertEquals("Registration as ADMIN is not allowed through the public API", ex.getMessage());
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void testRegisterDuplicateEmailThrowsConflict() {
        when(userRepository.existsByEmail("arjun@estateai.com")).thenReturn(true);

        assertThrows(DuplicateResourceException.class, () -> authService.register(registerRequest));
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void testLoginSuccess() {
        when(userRepository.findByEmail("arjun@estateai.com")).thenReturn(Optional.of(testUser));
        when(jwtService.generateToken(testUser)).thenReturn("jwt.token.mock");

        AuthResponse response = authService.login(loginRequest);

        assertNotNull(response);
        assertEquals("jwt.token.mock", response.getToken());
        assertEquals("arjun@estateai.com", response.getUser().getEmail());
        verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
    }

    @Test
    void testLoginBlockedUserThrowsUnauthorized() {
        testUser.setBlocked(true);
        when(userRepository.findByEmail("arjun@estateai.com")).thenReturn(Optional.of(testUser));

        UnauthorizedException ex = assertThrows(UnauthorizedException.class, () -> authService.login(loginRequest));
        assertEquals("Your account is suspended. Please contact customer support.", ex.getMessage());
    }

    @Test
    void testGetCurrentUserSuccess() {
        when(userRepository.findByEmail("arjun@estateai.com")).thenReturn(Optional.of(testUser));

        UserResponse userResponse = authService.getCurrentUser("arjun@estateai.com");

        assertNotNull(userResponse);
        assertEquals("u1", userResponse.getId());
        assertEquals("Arjun Rao", userResponse.getName());
    }

    @Test
    void testGetCurrentUserNotFound() {
        when(userRepository.findByEmail("missing@estateai.com")).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> authService.getCurrentUser("missing@estateai.com"));
    }
}
