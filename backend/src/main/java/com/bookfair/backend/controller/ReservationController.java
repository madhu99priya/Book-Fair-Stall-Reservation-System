package com.bookfair.backend.controller;

import com.bookfair.backend.domain.User; // FIXED: changed from model to domain
import com.bookfair.backend.domain.Reservation; // FIXED: changed from model to domain
import com.bookfair.backend.domain.Stall; // FIXED: changed from model to domain
import com.bookfair.backend.dto.reservation.ReservationResponse; // ADDED
import com.bookfair.backend.service.ReservationService;
import com.bookfair.backend.service.UserService;
import com.bookfair.backend.util.QRCodeGenerator; // ADDED: your existing QR utility
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;
    private final UserService userService;
    // REMOVED: QrCodeService and MailService (will use existing utilities)

    // Create reservation
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'PUBLISHER')") // FIXED: changed EXHIBITOR to PUBLISHER
    public ResponseEntity<Map<String, Object>> createReservation(
            Authentication authentication,
            @RequestBody Map<String, List<Long>> body) {
        Map<String, Object> response = new HashMap<>();
        try {
            List<Long> stallIds = body.get("stallIds");
            User user = userService.getUserByEmail(authentication.getName());

            // Create reservation
            Reservation reservation = reservationService.createReservation(user, stallIds);

            // Get reserved stalls - FIXED: handle Set<Stall>
            List<Stall> reservedStalls = reservation.getStalls().stream().toList();
            response.put("reservedStalls", reservedStalls);
            response.put("reservationId", reservation.getId());

            // Generate QR code using your existing utility
            String qrContent = String.format(
                    "Reservation ID: %s\nUser: %s\nStalls: %s\nTime: %s",
                    reservation.getId(),
                    user.getUsername(), // FIXED: using username instead of email
                    reservedStalls.stream().map(Stall::getName).collect(Collectors.joining(",")),
                    reservation.getCreatedAt() // FIXED: using createdAt instead of reservedAt
            );

            try {
                String qrCodeBase64 = QRCodeGenerator.generateQRCodeBase64(qrContent);
                response.put("qrCodeBase64", qrCodeBase64);
            } catch (RuntimeException e) {
                System.err.println("QR generation failed: " + e.getMessage());
                response.put("qrError", "QR generation failed");
            }

            // TODO: Add email service integration
            // For now, just log the email intent
            System.out.println("Email would be sent to: " + user.getEmail());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace();
            response.put("error", "Reservation failed: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }

    // Get all reservations (admin only)
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Reservation>> getAllReservations() {
        return ResponseEntity.ok(reservationService.getAllReservations());
    }

    // ADDED: Alternative method for compatibility with frontend
    @GetMapping("/list")
    public List<ReservationResponse> list(Principal principal) {
        boolean isAdmin = hasAdminRole();
        return reservationService
                .listAllForUserOrAdmin(principal.getName(), isAdmin)
                .stream()
                .map(this::toDto)
                .toList();
    }

    // Get reservations by current user
    @GetMapping("/me")
    @PreAuthorize("hasAnyRole('ADMIN', 'PUBLISHER')")
    public ResponseEntity<List<Reservation>> getMyReservations(Authentication authentication) {
        String email = authentication.getName();
        User user = userService.getUserByEmail(email);
        return ResponseEntity.ok(reservationService.getReservationsByUser(user));
    }

    // Get reservation details by ID
    @GetMapping("/{id}")
    public ReservationResponse details(@PathVariable Long id) {
        return toDto(reservationService.getById(id));
    }

    // Cancel reservation
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'PUBLISHER')")
    public ResponseEntity<Void> cancelReservation(
            @PathVariable Long id,
            Authentication authentication) {
        String email = authentication.getName();
        User user = userService.getUserByEmail(email);
        reservationService.cancelReservation(id, user);
        return ResponseEntity.noContent().build();
    }

    // ADDED: Send email confirmation
    @PostMapping("/{id}/email-confirmation")
    public ReservationResponse sendEmail(@PathVariable Long id) {
        return toDto(reservationService.sendConfirmationEmail(id));
    }

    // ADDED: Get QR code for reservation
    @GetMapping("/{id}/qr-code")
    public ResponseEntity<Map<String, String>> getQRCode(@PathVariable Long id) {
        String qrCodeBase64 = reservationService.getQRCodeBase64(id);
        if (qrCodeBase64 != null) {
            return ResponseEntity.ok(Map.of("qrCode", qrCodeBase64));
        }
        return ResponseEntity.notFound().build();
    }

    // Helper method to convert Reservation to DTO
    private ReservationResponse toDto(Reservation r) {
        return ReservationResponse.builder()
                .id(r.getId())
                .businessName(r.getUser().getBusinessName())
                .username(r.getUser().getUsername())
                .stalls(r.getStalls().stream().map(Stall::getName).toList())
                .status(r.getStatus().name())
                .createdAt(r.getCreatedAt())
                .emailSent(r.isEmailSent())
                .build();
    }

    // Helper method to check admin role
    private boolean hasAdminRole() {
        var auth = org.springframework.security.core.context.SecurityContextHolder
                .getContext().getAuthentication();
        return auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
    }
}