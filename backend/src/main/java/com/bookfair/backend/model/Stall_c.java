package com.bookfair.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "stalls")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Stall_c {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Size size; // SMALL, MEDIUM, LARGE

    @NonNull
    private Double price;

    @Builder.Default
    private boolean booked = false; // Default value for @Builder

    public enum Size {
        SMALL, MEDIUM, LARGE
    }

    private Double x;
    private Double z;
}
