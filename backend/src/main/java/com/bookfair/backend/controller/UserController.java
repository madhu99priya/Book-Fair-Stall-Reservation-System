package com.bookfair.backend.controller;

import com.bookfair.backend.model.User;
import com.bookfair.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
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
    public User registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }
    
    // User login
    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        String token = userService.login(request.email(), request.password());
        User user = userService.getUserByEmail(request.email());
        return new LoginResponse(token, user);
    }

    @PostMapping("/admin/login")
    public ResponseEntity<LoginResponse> adminLogin(@RequestBody LoginRequest request) {
        String token = userService.login(request.email(), request.password());
        User user = userService.getUserByEmail(request.email());

        if (user.getRole() != User.Role.ADMIN) {
            return ResponseEntity.status(403).body(null);
        }

        return ResponseEntity.ok(new LoginResponse(token, user));
    }

    // Get all users
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // Get user by ID
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    // Get current authenticated user
    @GetMapping("/me")
    public User getCurrentUser(Authentication authentication) {
        String email = authentication.getName();
        User user = userService.getUserByEmail(email);
        return user;
    }

    // Delete user by ID
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }

    // Update current user
    @PutMapping("/me")
    @PreAuthorize("hasAnyRole('ADMIN','EXHIBITOR')")
    public User updateCurrentUser(@RequestBody User updatedData, Authentication authentication) {
        User currentUser = userService.getUserByEmail(authentication.getName());
        updatedData.setId(currentUser.getId());  // ensure the correct user is updated
        return userService.updateUser(updatedData);
    }

    // Optional: Admin can update any user
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public User updateUserByAdmin(@PathVariable Long id, @RequestBody User updatedData) {
        updatedData.setId(id);
        return userService.updateUser(updatedData);
    }

    @PutMapping("/{id}/role")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<User> updateUserRole(
            @PathVariable Long id,
            @RequestBody RoleUpdateRequest request
    ) {
        User updatedUser = userService.updateUserRole(id, request.role());
        return ResponseEntity.ok(updatedUser);
    }

    record RoleUpdateRequest(User.Role role) {}


    @PutMapping("/change-password")
    public ResponseEntity<Void> changePassword(@RequestBody PasswordChangeRequest request, Authentication auth) {
        userService.changePassword(auth.getName(), request.oldPassword(), request.newPassword());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/genres")
    public User addGenresForCurrentUser(
            @RequestBody List<String> genres,
            Authentication authentication
    ) {
        String email = authentication.getName();
        return userService.addGenresForCurrentUser(genres, email);
    }
    
    // DTOs
    record LoginRequest(String email, String password) {}
    record LoginResponse(String token, User user) {}
    record PasswordChangeRequest(String oldPassword, String newPassword) {}
}
