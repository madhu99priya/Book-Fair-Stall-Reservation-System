package com.bookfair.backend.service;

import com.bookfair.backend.model.Reservation;
import com.bookfair.backend.model.Stall;
import com.bookfair.backend.model.User;
import com.bookfair.backend.repository.ReservationRepository;
import com.bookfair.backend.repository.StallRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservationService {

    private final ReservationRepository reservationRepository;
    //private final UserRepository userRepository;
    private final StallRepository stallRepository;

    // Create a new reservation
    public Reservation createReservation(User user, Long stallId) {

        Stall stall = stallRepository.findById(stallId)
                .orElseThrow(() -> new RuntimeException("Stall not found"));

        if (stall.isBooked()) {
            throw new RuntimeException("Stall is already booked");
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

    // Get all reservations
    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    // Get reservations by user
    public List<Reservation> getReservationsByUser(User user) {
        return reservationRepository.findByUser(user);
    }

    // Cancel reservation
    public void cancelReservation(Long reservationId, User user) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));
        
        if (!reservation.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("You are not authorized to cancel this reservation");
        }
        // Free up the stall
        Stall stall = reservation.getStall();
        stall.setBooked(false);
        stallRepository.save(stall);

        reservationRepository.deleteById(reservationId);
    }
}
