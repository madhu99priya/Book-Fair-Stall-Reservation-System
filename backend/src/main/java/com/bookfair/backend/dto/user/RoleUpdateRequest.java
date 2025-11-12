package com.bookfair.backend.dto.user;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.List;

@Data
public class RoleUpdateRequest {
    @NotEmpty
    private List<String> roles;
}