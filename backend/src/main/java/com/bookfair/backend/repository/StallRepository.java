package com.bookfair.backend.repository;

import com.bookfair.backend.domain.Stall;
import com.bookfair.backend.domain.enums.StallStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StallRepository extends JpaRepository<Stall, Long> {
    List<Stall> findByStatus(StallStatus status);
}