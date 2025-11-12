package com.bookfair.backend.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String fullName; // UPDATED: matches existing schema

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private Role role = Role.EXHIBITOR; // UPDATED: using enum instead of separate roles table

    public enum Role {
        ADMIN,
        EXHIBITOR
    }

    // ADDED: Helper methods for compatibility with new code
    public String getUsername() {
        return email; // Use email as username for login
    }

    public String getBusinessName() {
        return fullName; // Map fullName to businessName for compatibility
    }

    public void setBusinessName(String businessName) {
        this.fullName = businessName;
    }

    // ADDED: For role-based access compatibility
    public boolean hasRole(String roleName) {
        return this.role != null && this.role.name().equals(roleName);
    }
}