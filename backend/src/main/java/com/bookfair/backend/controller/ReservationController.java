package com.bookfair.backend.controller;

import com.bookfair.backend.model.User;
import com.bookfair.backend.model.Reservation;
import com.bookfair.backend.model.Stall;
import com.bookfair.backend.service.QrCodeService;
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
    private final QrCodeService qrCodeService;

    // Create reservation
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'EXHIBITOR')")
    public ResponseEntity<Map<String, Object>> createReservation(
            Authentication authentication,
            @RequestBody Map<String, List<Long>> body // expects {"stallIds":[1,2,3]}
    ) {
        Map<String, Object> response = new HashMap<>();
        try {
            List<Long> stallIds = body.get("stallIds");
            User user = userService.getUserByEmail(authentication.getName());

            // 1️⃣ Create reservations
            List<Reservation> reservations = stallIds.stream()
                    .map(id -> reservationService.createReservation(user, id))
                    .collect(Collectors.toList());

            // 2️⃣ Reserved stalls
            List<Stall> reservedStalls = reservations.stream()
                    .map(Reservation::getStall)
                    .collect(Collectors.toList());

            response.put("reservedStalls", reservedStalls);

            // 3️⃣ Generate QR code
            String qrContent = String.format(
                    "Reservation IDs: %s\nUser: %s\nStalls: %s\nTime: %s",
                    reservations.stream().map(r -> r.getId().toString()).collect(Collectors.joining(",")),
                    user.getEmail(),
                    reservedStalls.stream().map(Stall::getName).collect(Collectors.joining(",")),
                    reservations.get(0).getReservedAt()
            );

            String qrCodeBase64 = null;
            try {
                qrCodeBase64 = qrCodeService.generateQRCodeBase64(qrContent);
            } catch (RuntimeException e) {
                System.err.println("QR generation failed: " + e.getMessage());
                // optional: continue without QR code
            }

            response.put("qrCodeBase64", qrCodeBase64);

            // Optional: save QR code in the first reservation
            if (qrCodeBase64 != null && !reservations.isEmpty()) {
                reservations.get(0).setQrCodeBase64(qrCodeBase64);
            }

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace();
            response.put("error", "Reservation failed: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
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