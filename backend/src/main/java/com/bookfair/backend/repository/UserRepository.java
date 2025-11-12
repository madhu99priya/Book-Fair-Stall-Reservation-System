package com.bookfair.backend.repository;

import com.bookfair.backend.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email); // Primary method for login

    // ADDED: For compatibility with new code that expects findByUsername
    default Optional<User> findByUsername(String username) {
        return findByEmail(username); // Map username to email
    }

    boolean existsByEmail(String email);

    // ADDED: For compatibility
    default boolean existsByUsername(String username) {
        return existsByEmail(username);
    }
}