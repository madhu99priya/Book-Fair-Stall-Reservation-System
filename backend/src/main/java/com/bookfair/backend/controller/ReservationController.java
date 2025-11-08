package com.bookfair.backend.controller;

import com.bookfair.backend.model.Reservation;
import com.bookfair.backend.model.User;
import com.bookfair.backend.service.ReservationService;
import org.springframework.lang.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ReservationController {

    private final ReservationService reservationService;

    @PostMapping("/{stallId}")
    public Reservation reserveStall(@RequestBody @NonNull User user, @PathVariable @NonNull Long stallId) {
        return reservationService.reserveStall(user, stallId);
    }
}
