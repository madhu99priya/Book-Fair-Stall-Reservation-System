package com.bookfair.backend.controller;

import com.bookfair.backend.domain.Reservation;
import com.bookfair.backend.domain.Stall;
import com.bookfair.backend.dto.stall.ReserveRequest;
import com.bookfair.backend.service.StallService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/stalls")
public class StallController {

    private final StallService stallService;

    public StallController(StallService stallService) {
        this.stallService = stallService;
    }

    @GetMapping
    public List<Stall> list() {
        return stallService.listAll();
    }

    @PostMapping("/reserve")
    public Reservation reserve(@Valid @RequestBody ReserveRequest req, Principal principal) {
        return stallService.reserve(principal.getName(), req.getStallIds());
    }

    @PostMapping("/{id}/release")
    public void release(@PathVariable Long id) {
        stallService.release(id);
    }
}