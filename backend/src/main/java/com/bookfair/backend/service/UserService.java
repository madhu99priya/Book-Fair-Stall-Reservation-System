package com.bookfair.backend.service;

import com.bookfair.backend.domain.User;
import com.bookfair.backend.repository.UserRepository;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    // Register a new user
    public User registerUser(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Set default role if none provided
        if (user.getRole() == null) {
            user.setRole(User.Role.EXHIBITOR);
        }

        return userRepository.save(user);
    }

    // Login and generate JWT token
    public String login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        // Generate token with single role
        return jwtService.generateToken(user.getEmail(), List.of(user.getRole().name()));
    }

    // Fetch all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Alternative method name for compatibility
    public List<User> listAll() {
        return userRepository.findAll();
    }

    // Fetch user by ID
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // Delete user
    public void deleteUser(Long id) {
        User user = getUserById(id);
        userRepository.delete(user);
    }

    // Update user
    public User updateUser(User updatedUser) {
        User user = userRepository.findById(updatedUser.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (updatedUser.getFullName() != null)
            user.setFullName(updatedUser.getFullName());
        if (updatedUser.getEmail() != null)
            user.setEmail(updatedUser.getEmail());
        if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
        }
        // ADDED: Update role if provided
        if (updatedUser.getRole() != null)
            user.setRole(updatedUser.getRole());

        return userRepository.save(user);
    }

    // ADDED: Update user role (for admin functionality)
    public User updateRole(Long userId, RoleUpdateRequest req) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        try {
            User.Role newRole = User.Role.valueOf(req.role().toUpperCase());
            user.setRole(newRole);
            return userRepository.save(user);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid role: " + req.role() + ". Valid roles are: ADMIN, EXHIBITOR");
        }
    }

    // ADDED: Change password method
    public void changePassword(String email, String oldPassword, String newPassword) {
        User user = getUserByEmail(email);

        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new RuntimeException("Old password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    // ADDED: Check if user has specific role
    public boolean userHasRole(Long userId, String roleName) {
        User user = getUserById(userId);
        return user.getRole().name().equals(roleName.toUpperCase());
    }

    // ADDED: Get users by role
    public List<User> getUsersByRole(User.Role role) {
        return userRepository.findAll().stream()
                .filter(user -> user.getRole() == role)
                .toList();
    }

    // ADDED: Count users by role
    public long countUsersByRole(User.Role role) {
        return userRepository.findAll().stream()
                .filter(user -> user.getRole() == role)
                .count();
    }

    // Implement UserDetailsService for JWT auth
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .roles(user.getRole().name()) // Single role
                .build();
    }

    // Get user by email
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // ADDED: Check if email exists (useful for validation)
    public boolean emailExists(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    // ADDED: Create admin user programmatically
    public User createAdminUser(String email, String password, String fullName) {
        if (emailExists(email)) {
            throw new RuntimeException("Admin user with email " + email + " already exists");
        }

        User admin = User.builder()
                .email(email)
                .password(passwordEncoder.encode(password))
                .fullName(fullName)
                .role(User.Role.ADMIN)
                .build();

        return userRepository.save(admin);
    }

    // ADDED: Create exhibitor user programmatically
    public User createExhibitorUser(String email, String password, String fullName) {
        if (emailExists(email)) {
            throw new RuntimeException("Exhibitor user with email " + email + " already exists");
        }

        User exhibitor = User.builder()
                .email(email)
                .password(passwordEncoder.encode(password))
                .fullName(fullName)
                .role(User.Role.EXHIBITOR)
                .build();

        return userRepository.save(exhibitor);
    }

    // DTOs - Inner classes for requests
    public record RoleUpdateRequest(String role) {
    }

    public record UserRegistrationRequest(
            String email,
            String password,
            String fullName,
            String role // Optional, defaults to EXHIBITOR
    ) {
    }

    public record PasswordChangeRequest(String oldPassword, String newPassword) {
    }
}