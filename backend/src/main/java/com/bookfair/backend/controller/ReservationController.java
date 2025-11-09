package com.bookfair.backend.controller;

import com.bookfair.backend.model.User;
import com.bookfair.backend.model.Reservation;
import com.bookfair.backend.service.ReservationService;
import com.bookfair.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;
    private final UserService userService;

    // Create reservation
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'EXHIBITOR')")
    public ResponseEntity<Reservation> createReservation(
            Authentication authentication,
            @RequestParam Long stallId) {
        User user = userService.getUserByEmail(authentication.getName());
        return ResponseEntity.ok(reservationService.createReservation(user, stallId));
    }

    // Get all reservations
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Reservation>> getAllReservations() {
        return ResponseEntity.ok(reservationService.getAllReservations());
    }

    // Get reservations by user
    @GetMapping("/me")
    @PreAuthorize("hasAnyRole('ADMIN', 'EXHIBITOR')")
    public ResponseEntity<List<Reservation>> getMyReservations(Authentication authentication ) {
        String email = authentication.getName();
        User user = userService.getUserByEmail(email);
        return ResponseEntity.ok(reservationService.getReservationsByUser(user));
    }

    // Cancel reservation
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'EXHIBITOR')")
    public ResponseEntity<Void> cancelReservation(
        @PathVariable Long id,
        Authentication authentication) {
        String email = authentication.getName();
        User user = userService.getUserByEmail(email);
        reservationService.cancelReservation(id, user);
        return ResponseEntity.noContent().build();
    }
}