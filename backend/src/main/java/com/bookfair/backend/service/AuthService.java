package com.bookfair.backend.service;

import com.bookfair.backend.domain.User;
import com.bookfair.backend.dto.auth.LoginRequest;
import com.bookfair.backend.dto.auth.TokenResponse;
import com.bookfair.backend.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository,
            BCryptPasswordEncoder encoder,
            JwtService jwtService) {
        this.userRepository = userRepository;
        this.encoder = encoder;
        this.jwtService = jwtService;
    }

    public TokenResponse login(LoginRequest req) {
        // UPDATED: Use email for login (since that's the username)
        User user = userRepository.findByEmail(req.getUsername())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!encoder.matches(req.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        // UPDATED: Generate token with single role
        String token = jwtService.generateToken(user.getEmail(), List.of(user.getRole().name()));
        return new TokenResponse(token);
    }

    public User me(String username) {
        return userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}