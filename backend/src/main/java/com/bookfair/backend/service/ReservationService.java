package com.bookfair.backend.service;

import com.bookfair.backend.model.Reservation;
import com.bookfair.backend.model.Stall;
import com.bookfair.backend.model.User;
import com.bookfair.backend.repository.ReservationRepository;
import com.bookfair.backend.repository.StallRepository;
import org.springframework.lang.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final StallRepository stallRepository;

    public @NonNull Reservation reserveStall(@NonNull User user,@NonNull Long stallId) {
        Stall stall = stallRepository.findById(stallId)
                .orElseThrow(() -> new RuntimeException("Stall not found"));

        if (stall.isBooked()) {
            throw new RuntimeException("Stall already booked");
        }

        stall.setBooked(true);
        stallRepository.save(stall);

        Reservation reservation = Reservation.builder()
                .user(user)
                .stall(stall)
                .reservedAt(LocalDateTime.now())
                .build();

        return reservationRepository.save(reservation);
    }
}
