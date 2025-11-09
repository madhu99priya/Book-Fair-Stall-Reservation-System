package com.bookfair.backend.service;

import com.bookfair.backend.domain.Reservation;
import com.bookfair.backend.domain.Stall;
import com.bookfair.backend.domain.User;
import com.bookfair.backend.domain.enums.ReservationStatus;
import com.bookfair.backend.domain.enums.StallStatus;
import com.bookfair.backend.exception.BusinessRuleViolationException;
import com.bookfair.backend.exception.ResourceNotFoundException;
import com.bookfair.backend.repository.ReservationRepository;
import com.bookfair.backend.repository.StallRepository;
import com.bookfair.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class StallService {

    private final StallRepository stallRepository;
    private final UserRepository userRepository;
    private final ReservationRepository reservationRepository;
    private final ReservationService reservationService;

    public StallService(StallRepository stallRepository,
            UserRepository userRepository,
            ReservationRepository reservationRepository,
            ReservationService reservationService) {
        this.stallRepository = stallRepository;
        this.userRepository = userRepository;
        this.reservationRepository = reservationRepository;
        this.reservationService = reservationService;
    }

    public List<Stall> listAll() {
        return stallRepository.findAll();
    }

    @Transactional
    public Reservation reserve(String username, List<Long> stallIds) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
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

    @Transactional
    public void release(Long stallId) {
        Stall stall = stallRepository.findById(stallId)
                .orElseThrow(() -> new ResourceNotFoundException("Stall not found"));
        stall.setStatus(StallStatus.AVAILABLE);
        stallRepository.save(stall);
        // NOTE: This simple implementation does not update reservation history.
        // For production: implement a proper cancellation flow.
    }
}