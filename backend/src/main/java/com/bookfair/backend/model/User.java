package com.bookfair.backend.model;

import java.util.List;

import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import lombok.*;

@Entity
@Table(name = "users")
@Data
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
    private String fullName;

    @Column(nullable = false)
    @Pattern(
        regexp = "^(\\+?\\d{10,15}|\\d{3}[- ]?\\d{3}[- ]?\\d{4})$",
        message = "Invalid contact number format"
    )
    private String contactNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private Role role = Role.EXHIBITOR;

    @ManyToMany
    @JoinTable(name = "user_genres", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "genre_id"))
    private List<Genre> genres;

    public enum Role {
        ADMIN,
        EXHIBITOR
    }
}