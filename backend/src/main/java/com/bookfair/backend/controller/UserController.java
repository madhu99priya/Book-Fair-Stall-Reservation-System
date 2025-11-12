package com.bookfair.backend.controller;

import com.bookfair.backend.domain.User;
import com.bookfair.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // User registration
    @PostMapping("/register")
    public ResponseEntity<UserResponse> registerUser(@Valid @RequestBody UserRegistrationRequest request) {
        try {
            // Create user from request
            User user = User.builder()
                    .email(request.email())
                    .password(request.password()) // Will be encoded in service
                    .fullName(request.fullName())
                    .role(request.role() != null ? User.Role.valueOf(request.role().toUpperCase())
                            : User.Role.EXHIBITOR)
                    .build();

            User savedUser = userService.registerUser(user);
            return ResponseEntity.ok(new UserResponse(savedUser));
        } catch (Exception e) {
            throw new RuntimeException("Registration failed: " + e.getMessage());
        }
    }

    // MOVED: Login should be in AuthController, but keeping for backward
    // compatibility
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        try {
            String token = userService.login(request.email(), request.password());
            User user = userService.getUserByEmail(request.email());
            return ResponseEntity.ok(new LoginResponse(token, new UserResponse(user)));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new LoginResponse(null, null, e.getMessage()));
        }
    }

    // Get all users (admin only)
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        List<UserResponse> users = userService.getAllUsers().stream()
                .map(UserResponse::new)
                .toList();
        return ResponseEntity.ok(users);
    }

    // Alternative method name for compatibility
    @GetMapping("/list")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserResponse>> list() {
        List<UserResponse> users = userService.listAll().stream()
                .map(UserResponse::new)
                .toList();
        return ResponseEntity.ok(users);
    }

    // Get user by ID (admin only)
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id) {
        try {
            User user = userService.getUserById(id);
            return ResponseEntity.ok(new UserResponse(user));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Get current authenticated user
    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser(Authentication authentication) {
        try {
            String email = authentication.getName();
            User user = userService.getUserByEmail(email);
            return ResponseEntity.ok(new UserResponse(user));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete user by ID (admin only)
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Update current user
    @PutMapping("/me")
    @PreAuthorize("hasAnyRole('ADMIN','EXHIBITOR')")
    public ResponseEntity<UserResponse> updateCurrentUser(@Valid @RequestBody UserUpdateRequest updatedData,
            Authentication authentication) {
        try {
            User currentUser = userService.getUserByEmail(authentication.getName());

            // Create updated user object
            User userToUpdate = User.builder()
                    .id(currentUser.getId())
                    .email(updatedData.email() != null ? updatedData.email() : currentUser.getEmail())
                    .fullName(updatedData.fullName() != null ? updatedData.fullName() : currentUser.getFullName())
                    .password(updatedData.password() != null ? updatedData.password() : currentUser.getPassword())
                    .role(currentUser.getRole()) // Current user can't change their own role
                    .build();

            User updated = userService.updateUser(userToUpdate);
            return ResponseEntity.ok(new UserResponse(updated));
        } catch (Exception e) {
            throw new RuntimeException("Update failed: " + e.getMessage());
        }
    }

    // Admin can update any user
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserResponse> updateUserByAdmin(@PathVariable Long id,
            @Valid @RequestBody UserUpdateRequest updatedData) {
        try {
            User existingUser = userService.getUserById(id);

            // Create updated user object
            User userToUpdate = User.builder()
                    .id(id)
                    .email(updatedData.email() != null ? updatedData.email() : existingUser.getEmail())
                    .fullName(updatedData.fullName() != null ? updatedData.fullName() : existingUser.getFullName())
                    .password(updatedData.password() != null ? updatedData.password() : existingUser.getPassword())
                    .role(updatedData.role() != null ? User.Role.valueOf(updatedData.role().toUpperCase())
                            : existingUser.getRole())
                    .build();

            User updated = userService.updateUser(userToUpdate);
            return ResponseEntity.ok(new UserResponse(updated));
        } catch (Exception e) {
            throw new RuntimeException("Update failed: " + e.getMessage());
        }
    }

    // Update user role (admin only)
    @PutMapping("/{id}/role")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserResponse> updateRole(@PathVariable Long id,
            @Valid @RequestBody UserService.RoleUpdateRequest req) {
        try {
            User updated = userService.updateRole(id, req);
            return ResponseEntity.ok(new UserResponse(updated));
        } catch (Exception e) {
            throw new RuntimeException("Role update failed: " + e.getMessage());
        }
    }

    // Change password
    @PutMapping("/change-password")
    public ResponseEntity<ApiResponse> changePassword(@Valid @RequestBody UserService.PasswordChangeRequest request,
            Authentication auth) {
        try {
            userService.changePassword(auth.getName(), request.oldPassword(), request.newPassword());
            return ResponseEntity.ok(new ApiResponse("Password changed successfully", true));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse("Password change failed: " + e.getMessage(), false));
        }
    }

    // Get users by role (admin only)
    @GetMapping("/role/{role}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserResponse>> getUsersByRole(@PathVariable String role) {
        try {
            User.Role userRole = User.Role.valueOf(role.toUpperCase());
            List<UserResponse> users = userService.getUsersByRole(userRole).stream()
                    .map(UserResponse::new)
                    .toList();
            return ResponseEntity.ok(users);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid role: " + role);
        }
    }

    // Count users by role (admin only)
    @GetMapping("/count/role/{role}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CountResponse> countUsersByRole(@PathVariable String role) {
        try {
            User.Role userRole = User.Role.valueOf(role.toUpperCase());
            long count = userService.countUsersByRole(userRole);
            return ResponseEntity.ok(new CountResponse(role, count));
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid role: " + role);
        }
    }

    // DTOs
    public record LoginRequest(
            @jakarta.validation.constraints.Email(message = "Invalid email format") @jakarta.validation.constraints.NotBlank(message = "Email is required") String email,

            @jakarta.validation.constraints.NotBlank(message = "Password is required") String password) {
    }

    public record LoginResponse(String token, UserResponse user, String error) {
        public LoginResponse(String token, UserResponse user) {
            this(token, user, null);
        }
    }

    public record UserRegistrationRequest(
            @jakarta.validation.constraints.Email(message = "Invalid email format") @jakarta.validation.constraints.NotBlank(message = "Email is required") String email,

            @jakarta.validation.constraints.NotBlank(message = "Password is required") @jakarta.validation.constraints.Size(min = 6, message = "Password must be at least 6 characters") String password,

            @jakarta.validation.constraints.NotBlank(message = "Full name is required") String fullName,

            @jakarta.validation.constraints.Pattern(regexp = "ADMIN|EXHIBITOR", message = "Role must be either ADMIN or EXHIBITOR") String role) {
    }

    public record UserUpdateRequest(
            @jakarta.validation.constraints.Email(message = "Invalid email format") String email,

            @jakarta.validation.constraints.Size(min = 6, message = "Password must be at least 6 characters") String password,

            String fullName,

            @jakarta.validation.constraints.Pattern(regexp = "ADMIN|EXHIBITOR", message = "Role must be either ADMIN or EXHIBITOR") String role) {
    }

    // Response DTOs (don't expose password)
    public record UserResponse(
            Long id,
            String email,
            String fullName,
            String role) {
        public UserResponse(User user) {
            this(user.getId(), user.getEmail(), user.getFullName(), user.getRole().name());
        }
    }

    public record ApiResponse(String message, boolean success) {
    }

    public record CountResponse(String role, long count) {
    }
}