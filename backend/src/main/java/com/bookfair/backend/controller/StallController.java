package com.bookfair.backend.controller;

import com.bookfair.backend.model.Stall;
import com.bookfair.backend.service.StallService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;


import java.util.List;

@RestController
@RequestMapping("/api/stalls")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class StallController {

    private final StallService stallService;

    // Get all stalls (public)
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'EXHIBITOR')")
    public ResponseEntity<List<Stall>> getAllStalls() {
        return ResponseEntity.ok(stallService.getAllStalls());
    }

    // Get stall by ID (public)
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'EXHIBITOR')")
    public ResponseEntity<Stall> getStallById(@PathVariable Long id) {
        return ResponseEntity.ok(stallService.getStallById(id));
    }

    // Create stall (protected — admin)
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Stall> createStall(@RequestBody Stall stall) {
        return ResponseEntity.ok(stallService.createStall(stall));
    }

    // Update stall (protected — admin)
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Stall> updateStall(@PathVariable Long id, @RequestBody Stall stall) {
        return ResponseEntity.ok(stallService.updateStall(id, stall));
    }

    // Delete stall (protected — admin)
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteStall(@PathVariable Long id) {
        stallService.deleteStall(id);
        return ResponseEntity.noContent().build();
    }
}
