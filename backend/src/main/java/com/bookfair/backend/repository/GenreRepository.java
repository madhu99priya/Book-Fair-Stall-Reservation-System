package com.bookfair.backend.repository;

import com.bookfair.backend.domain.Genre;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GenreRepository extends JpaRepository<Genre, Long> {
    Optional<Genre> findByName(String name);

    boolean existsByName(String name);
}