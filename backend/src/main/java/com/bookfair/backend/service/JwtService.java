package com.bookfair.backend.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import com.bookfair.backend.domain.User; // Using domain package
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class JwtService {

    private final Key key;
    private final long expirationMillis;

    // Use configurable values from application.properties
    public JwtService(
            @Value("${jwt.secret:BookFairJwtSecretKeyForHS512ShouldBeVeryLongAndRandomForSecurity2024}") String secret,
            @Value("${jwt.expiration-minutes:120}") long expirationMinutes) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
        this.expirationMillis = expirationMinutes * 60_000;
    }

    // UPDATED: Generate JWT token with single role support
    public String generateToken(User user) {
        // Convert single role to list for consistency with new code
        return generateToken(user.getEmail(), List.of(user.getRole().name()));
    }

    // Generate token with username and roles
    public String generateToken(String username, List<String> roles) {
        Instant now = Instant.now();
        return Jwts.builder()
                .setSubject(username)
                .addClaims(Map.of("roles", roles))
                .setIssuedAt(Date.from(now))
                .setExpiration(Date.from(now.plusMillis(expirationMillis)))
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }

    // Extract username from token
    public String extractUsername(String token) {
        return getClaims(token).getSubject();
    }

    // Extract roles from token (supports multiple roles for future compatibility)
    public List<String> extractRoles(String token) {
        @SuppressWarnings("unchecked")
        List<String> roles = (List<String>) getClaims(token).get("roles");
        return roles != null ? roles : List.of();
    }

    // BACKWARD COMPATIBILITY: Extract single role
    public String extractRole(String token) {
        List<String> roles = extractRoles(token);
        return roles.isEmpty() ? null : roles.get(0);
    }

    // Validate token
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    // Parse method for compatibility with new auth filter
    public Jws<Claims> parse(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
    }

    // Get claims
    private Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // Check if token is expired
    private boolean isTokenExpired(String token) {
        return getClaims(token).getExpiration().before(new Date());
    }
}