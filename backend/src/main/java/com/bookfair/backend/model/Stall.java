package com.bookfair.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "stalls")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Stall {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    private String name;

    @NonNull
    private String location;

    @Builder.Default
    private boolean booked = false; // Default value for @Builder

    @NonNull
    private Double price;
}
