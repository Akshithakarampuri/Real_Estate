package com.estateai;

import com.estateai.model.Role;
import com.estateai.model.User;
import com.estateai.security.JwtService;
import io.jsonwebtoken.Claims;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

class JwtServiceTest {

    private JwtService jwtService;

    @BeforeEach
    void setUp() {
        jwtService = new JwtService();
        ReflectionTestUtils.setField(jwtService, "secretKey", "404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970");
        ReflectionTestUtils.setField(jwtService, "jwtExpiration", 86400000L);
    }

    @Test
    void testGenerateTokenAndExtractClaims() {
        User user = User.builder()
                .id("user-123")
                .name("Kavitha Reddy")
                .email("kavitha@estateai.com")
                .role(Role.BUYER)
                .build();

        String token = jwtService.generateToken(user);
        assertNotNull(token);

        String username = jwtService.extractUsername(token);
        assertEquals("kavitha@estateai.com", username);

        Claims claims = jwtService.extractAllClaims(token);
        assertEquals("user-123", claims.get("userId"));
        assertEquals("kavitha@estateai.com", claims.get("email"));
        assertEquals("BUYER", claims.get("role"));

        assertFalse(jwtService.isTokenExpired(token));
    }
}
