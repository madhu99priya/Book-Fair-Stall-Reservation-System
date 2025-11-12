package com.bookfair.backend.controller;

import com.bookfair.backend.domain.Stall; // FIXED: changed from model to domain
import com.bookfair.backend.domain.Reservation; // ADDED
import com.bookfair.backend.dto.stall.ReserveRequest; // ADDED
import com.bookfair.backend.service.StallService;
import jakarta.validation.Valid; // ADDED
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.security.Principal; // ADDED
import java.util.List;

@RestController
@RequestMapping("/api/stalls")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class StallController {

    private final StallService stallService;

    // Get all stalls
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'PUBLISHER')") // FIXED: changed EXHIBITOR to PUBLISHER
    public ResponseEntity<List<Stall>> getAllStalls() {
        return ResponseEntity.ok(stallService.getAllStalls());
    }

    // ADDED: Alternative method name for compatibility
    @GetMapping("/list")
    public List<Stall> list() {
        return stallService.listAll();
    }

    // Get stall by ID
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'PUBLISHER')")
    public ResponseEntity<Stall> getStallById(@PathVariable Long id) {
        return ResponseEntity.ok(stallService.getStallById(id));
    }

    // Create stall (admin only)
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Stall> createStall(@RequestBody Stall stall) {
        return ResponseEntity.ok(stallService.createStall(stall));
    }

    // Update stall (admin only)
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Stall> updateStall(@PathVariable Long id, @RequestBody Stall stall) {
        return ResponseEntity.ok(stallService.updateStall(id, stall));
    }

    // Delete stall (admin only)
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteStall(@PathVariable Long id) {
        stallService.deleteStall(id);
        return ResponseEntity.noContent().build();
    }

    // ADDED: Reserve stalls endpoint
    @PostMapping("/reserve")
    @PreAuthorize("hasAnyRole('ADMIN', 'PUBLISHER')")
    public Reservation reserve(@Valid @RequestBody ReserveRequest req, Principal principal) {
        return stallService.reserve(principal.getName(), req.getStallIds());
    }

    // ADDED: Release stall endpoint (admin only)
    @PostMapping("/{id}/release")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> release(@PathVariable Long id) {
        stallService.release(id);
        return ResponseEntity.noContent().build();
    }
}