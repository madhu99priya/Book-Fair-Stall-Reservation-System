package com.bookfair.backend.controller;

import com.bookfair.backend.model.User;
import com.bookfair.backend.model.Reservation;
import com.bookfair.backend.model.Stall;
import com.bookfair.backend.service.ReservationService;
import com.bookfair.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import java.util.Map;

@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;
    private final UserService userService;

    // Create reservation
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'EXHIBITOR')")
    public ResponseEntity<Map<String, Object>> createReservation(
            Authentication authentication,
            @RequestBody Map<String, List<Long>> body // expects {"stallIds":[1,2,3]}
    ) {
        List<Long> stallIds = body.get("stallIds");
        User user = userService.getUserByEmail(authentication.getName());

        // Create reservations for each stall
        List<Reservation> reservations = stallIds.stream()
                .map(id -> reservationService.createReservation(user, id))
                .collect(Collectors.toList());

        // Extract reserved stalls
        List<Stall> reservedStalls = reservations.stream()
                .map(Reservation::getStall)
                .collect(Collectors.toList());

        // Generate QR code (assuming each reservation has the same QR code for simplicity)
        //String qrCodeUrl = reservations.get(0).getQrCodeUrl(); 

        // Prepare response
        Map<String, Object> response = new HashMap<>();
        //response.put("qrCodeUrl", qrCodeUrl);
        response.put("reservedStalls", reservedStalls);

        return ResponseEntity.ok(response);
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