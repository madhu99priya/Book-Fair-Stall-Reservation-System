package com.bookfair.backend.controller;

import com.bookfair.backend.domain.Reservation;
import com.bookfair.backend.dto.reservation.ReservationResponse;
import com.bookfair.backend.service.ReservationService;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @GetMapping
    public List<ReservationResponse> list(Principal principal) {
        boolean isAdmin = hasAdminRole();
        return reservationService
                .listAllForUserOrAdmin(principal.getName(), isAdmin)
                .stream()
                .map(this::toDto)
                .toList();
    }

    @GetMapping("/{id}")
    public ReservationResponse details(@PathVariable Long id) {
        return toDto(reservationService.getById(id));
    }

    @PostMapping("/{id}/email-confirmation")
    public ReservationResponse sendEmail(@PathVariable Long id) {
        return toDto(reservationService.sendConfirmationEmail(id));
    }

    private ReservationResponse toDto(Reservation r) {
        return ReservationResponse.builder()
                .id(r.getId())
                .businessName(r.getUser().getBusinessName())
                .username(r.getUser().getUsername())
                .stalls(r.getStalls().stream().map(s -> s.getName()).toList())
                .status(r.getStatus().name())
                .createdAt(r.getCreatedAt())
                .emailSent(r.isEmailSent())
                .build();
    }

    private boolean hasAdminRole() {
        var auth = org.springframework.security.core.context.SecurityContextHolder
                .getContext().getAuthentication();
        return auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
    }
}