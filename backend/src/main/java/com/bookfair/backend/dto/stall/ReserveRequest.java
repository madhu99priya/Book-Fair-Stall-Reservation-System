package com.bookfair.backend.dto.stall;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.List;

@Data
public class ReserveRequest {
    @NotEmpty
    private List<Long> stallIds;
    private String businessId; // optional from frontend; not strictly needed
}