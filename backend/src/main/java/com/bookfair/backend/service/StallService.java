package com.bookfair.backend.service;

import com.bookfair.backend.model.Stall;
import com.bookfair.backend.repository.StallRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StallService {

    private final StallRepository stallRepository;

    // Get all stalls
    public List<Stall> getAllStalls() {
        return stallRepository.findAll();
    }

    // Get stall by ID
    public Stall getStallById(Long id) {
        return stallRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Stall not found with ID: " + id));
    }

    // Add a new stall
    public Stall createStall(Stall stall) {
        if (stallRepository.findByName(stall.getName()).isPresent()) {
            throw new RuntimeException("Stall name already exists");
        }
        return stallRepository.save(stall);
    }

    // Update stall details
    public Stall updateStall(Long id, Stall updatedStall) {
        Stall stall = getStallById(id);
        stall.setName(updatedStall.getName());
        stall.setPrice(updatedStall.getPrice());
        stall.setSize(updatedStall.getSize());
        stall.setX(updatedStall.getX());
        stall.setZ(updatedStall.getZ());
        stall.setBooked(updatedStall.isBooked());
        return stallRepository.save(stall);
    }

    // Delete stall
    public void deleteStall(Long id) {
        Stall stall = getStallById(id);
        stallRepository.delete(stall);
    }
}
