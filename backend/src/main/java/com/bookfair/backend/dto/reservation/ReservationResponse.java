package com.bookfair.backend.dto.reservation;

import lombok.Builder;
import lombok.Data;

import java.time.Instant;
import java.util.List;

@Data
@Builder
public class ReservationResponse {
    private Long id;
    private String businessName;
    private String username;
    private List<String> stalls;
    private String status;
    private Instant createdAt;
    private boolean emailSent;
}