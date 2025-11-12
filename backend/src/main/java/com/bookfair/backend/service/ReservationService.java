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
    private final StallRepository stallRepository;

    private static final int MAX_STALLS_PER_USER = 3;

    // Create a new reservation
    public Reservation createReservation(User user, List<Long> stallIds) {
        
        // Count how many stalls this user has already booked
        Long existingStalls = reservationRepository.countStallsByUser(user);
        if (existingStalls + stallIds.size() > MAX_STALLS_PER_USER) {
            throw new RuntimeException("You cannot book more than " + MAX_STALLS_PER_USER + " stalls in total.");
        }

        List<Stall> stalls = stallRepository.findAllById(stallIds);

        if (stalls.size() != stallIds.size()) {
            throw new RuntimeException("One or more stalls not found");
        }

        // Check if any stall is already booked
        for (Stall stall : stalls) {
            if (stall.isBooked()) {
                throw new RuntimeException("Stall " + stall.getName() + " is already booked");
            }
            // Mark stall as booked
            stall.setBooked(true);
        }
        stallRepository.saveAll(stalls);

        Reservation reservation = Reservation.builder()
                .user(user)
                .stalls(stalls)
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
        for (Stall stall : reservation.getStalls()) {
            stall.setBooked(false);
            stallRepository.save(stall);
        }

        reservationRepository.deleteById(reservationId);
    }
}
