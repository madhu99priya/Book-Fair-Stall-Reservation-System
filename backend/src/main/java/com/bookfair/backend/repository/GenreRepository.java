package com.bookfair.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.bookfair.backend.model.*;

import java.util.Optional;

@Repository
public interface GenreRepository extends JpaRepository<Genre,Long>{
    // Optional: find a genre by name
    Optional<Genre> findByName(String name);
    
    // Optional: check if a genre exists by name
    boolean existsByName(String name);
}
