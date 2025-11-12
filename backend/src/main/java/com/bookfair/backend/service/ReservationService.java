package com.bookfair.backend.service;

import com.bookfair.backend.domain.Reservation;
import com.bookfair.backend.domain.Stall;
import com.bookfair.backend.domain.User;
import com.bookfair.backend.domain.enums.ReservationStatus;
import com.bookfair.backend.domain.enums.StallStatus;
import com.bookfair.backend.repository.ReservationRepository;
import com.bookfair.backend.repository.StallRepository;
import com.bookfair.backend.util.QRCodeGenerator; // FIXED: Use your existing utility
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Base64;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final StallRepository stallRepository;

    // Create a new reservation
    @Transactional
    public Reservation createReservation(User user, List<Long> stallIds) {
        List<Stall> stalls = stallRepository.findAllById(stallIds);

        if (stalls.size() != stallIds.size()) {
            throw new RuntimeException("One or more stalls not found");
        }

        // Check if any stall is already reserved
        for (Stall stall : stalls) {
            if (stall.getStatus() == StallStatus.RESERVED) {
                throw new RuntimeException("Stall " + stall.getName() + " is already reserved");
            }
            // Mark stall as reserved
            stall.setStatus(StallStatus.RESERVED);
            stallRepository.save(stall);
        }

        Reservation reservation = Reservation.builder()
                .user(user)
                .stalls(new HashSet<>(stalls))
                .createdAt(Instant.now())
                .status(ReservationStatus.CONFIRMED)
                .emailSent(false)
                .qrCode(generateQrBytes(user, new HashSet<>(stalls))) // FIXED: Use your utility
                .build();

        return reservationRepository.save(reservation);
    }

    // ADDED: Method to create confirmed reservation (used by StallService)
    @Transactional
    public Reservation createConfirmedReservation(User user, Set<Stall> stalls) {
        Reservation reservation = Reservation.builder()
                .user(user)
                .stalls(stalls)
                .status(ReservationStatus.CONFIRMED)
                .createdAt(Instant.now())
                .emailSent(false)
                .qrCode(generateQrBytes(user, stalls))
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
    @Transactional
    public void cancelReservation(Long reservationId, User user) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));

        if (!reservation.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("You are not authorized to cancel this reservation");
        }

        // Free up the stalls
        for (Stall stall : reservation.getStalls()) {
            stall.setStatus(StallStatus.AVAILABLE);
            stallRepository.save(stall);
        }

        // Update reservation status instead of deleting
        reservation.setStatus(ReservationStatus.CANCELLED);
        reservationRepository.save(reservation);
    }

    // FIXED: QR code generation using your existing utility
    private byte[] generateQrBytes(User user, Set<Stall> stalls) {
        try {
            // Create payload for QR code
            String payload = "RESV|" + user.getUsername() + "|"
                    + stalls.stream()
                            .map(Stall::getName)
                            .reduce((a, b) -> a + "," + b)
                            .orElse("")
                    + "|" + Instant.now().toString();

            // Generate QR code as Base64 string using your utility
            String qrCodeBase64 = QRCodeGenerator.generateQRCodeBase64(payload);

            // Extract the actual Base64 data (remove "data:image/png;base64," prefix)
            String base64Data = qrCodeBase64.replace("data:image/png;base64,", "");

            // Convert Base64 string back to bytes for storage
            return Base64.getDecoder().decode(base64Data);

        } catch (Exception e) {
            throw new RuntimeException("QR generation failed", e);
        }
    }

    // Get reservation by ID
    public Reservation getById(Long id) {
        return reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));
    }

    // Get reservations for user or admin
    public List<Reservation> listAllForUserOrAdmin(String username, boolean isAdmin) {
        if (isAdmin) {
            return reservationRepository.findAll();
        }
        return reservationRepository.findAll().stream()
                .filter(r -> r.getUser().getUsername().equals(username))
                .toList();
    }

    // ADDED: Send confirmation email (placeholder implementation)
    public Reservation sendConfirmationEmail(Long id) {
        Reservation res = getById(id);
        if (!res.isEmailSent()) {
            // TODO: Implement actual email sending logic
            System.out.println("Sending email confirmation for reservation #" + res.getId());
            res.setEmailSent(true);
            reservationRepository.save(res);
        }
        return res;
    }

    // ADDED: Get QR code as Base64 string for frontend
    public String getQRCodeBase64(Long reservationId) {
        Reservation reservation = getById(reservationId);
        if (reservation.getQrCode() != null) {
            return "data:image/png;base64," + Base64.getEncoder().encodeToString(reservation.getQrCode());
        }
        return null;
    }
}