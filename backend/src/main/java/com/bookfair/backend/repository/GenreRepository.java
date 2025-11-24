package com.bookfair.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.bookfair.backend.model.*;

import java.util.Optional;

@Repository
public interface GenreRepository extends JpaRepository<Genre,Long>{
    Optional<Genre> findByName(String name);
    boolean existsByName(String name);
}
