package com.bookfair.backend.service;

import com.bookfair.backend.domain.Stall; // FIXED: changed from model to domain
import com.bookfair.backend.domain.User; // ADDED
import com.bookfair.backend.domain.Reservation; // ADDED
import com.bookfair.backend.domain.enums.StallStatus; // ADDED
import com.bookfair.backend.domain.enums.ReservationStatus; // ADDED
import com.bookfair.backend.repository.StallRepository;
import com.bookfair.backend.repository.UserRepository; // ADDED
import com.bookfair.backend.repository.ReservationRepository; // ADDED
import com.bookfair.backend.exception.BusinessRuleViolationException; // ADDED
import com.bookfair.backend.exception.ResourceNotFoundException; // ADDED
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StallService {

    private final StallRepository stallRepository;
    private final UserRepository userRepository; // ADDED
    private final ReservationRepository reservationRepository; // ADDED
    private final ReservationService reservationService; // ADDED

    // Get all stalls
    public List<Stall> getAllStalls() {
        return stallRepository.findAll();
    }

    // ADDED: Better method name alignment
    public List<Stall> listAll() {
        return stallRepository.findAll();
    }

    // Get stall by ID
    public Stall getStallById(Long id) {
        return stallRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Stall not found with ID: " + id)); // FIXED: better
                                                                                                     // exception
    }

    // Add a new stall
    public Stall createStall(Stall stall) {
        // FIXED: Remove the findByName check since it doesn't exist in our repository
        // You can add this method to StallRepository if needed
        return stallRepository.save(stall);
    }

    // Update stall details - FIXED to match our domain model
    public Stall updateStall(Long id, Stall updatedStall) {
        Stall stall = getStallById(id);
        stall.setName(updatedStall.getName());
        stall.setSize(updatedStall.getSize()); // FIXED: using size instead of price
        stall.setStatus(updatedStall.getStatus()); // FIXED: using status instead of booked
        return stallRepository.save(stall);
    }

    // Delete stall
    public void deleteStall(Long id) {
        Stall stall = getStallById(id);
        stallRepository.delete(stall);
    }

    // ADDED: Reserve stalls (main functionality)
    @Transactional
    public Reservation reserve(String username, List<Long> stallIds) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        // Check business rule: max 3 stalls per user
        int currentReserved = reservationRepository.findByUser(user).stream()
                .filter(r -> r.getStatus() == ReservationStatus.CONFIRMED)
                .mapToInt(r -> r.getStalls().size()).sum();

        if (currentReserved + stallIds.size() > 3) {
            throw new BusinessRuleViolationException("Exceeds max 3 stalls per business");
        }

        List<Stall> stalls = stallRepository.findAllById(stallIds);
        if (stalls.size() != stallIds.size()) {
            throw new BusinessRuleViolationException("One or more stalls not found");
        }

        stalls.forEach(s -> {
            if (s.getStatus() != StallStatus.AVAILABLE) {
                throw new BusinessRuleViolationException("Stall " + s.getName() + " not available");
            }
            s.setStatus(StallStatus.RESERVED);
        });

        stallRepository.saveAll(stalls);
        return reservationService.createConfirmedReservation(user, new HashSet<>(stalls));
    }

    // ADDED: Release stall
    @Transactional
    public void release(Long stallId) {
        Stall stall = stallRepository.findById(stallId)
                .orElseThrow(() -> new ResourceNotFoundException("Stall not found"));
        stall.setStatus(StallStatus.AVAILABLE);
        stallRepository.save(stall);
    }
}