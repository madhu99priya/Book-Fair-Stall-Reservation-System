package com.bookfair.backend.dto.genre;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class GenreCreateRequest {
    @NotBlank
    private String name;
}