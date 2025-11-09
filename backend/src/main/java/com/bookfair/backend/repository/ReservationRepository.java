package com.bookfair.backend.repository;

import com.bookfair.backend.domain.Reservation;
import com.bookfair.backend.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByUser(User user);
}