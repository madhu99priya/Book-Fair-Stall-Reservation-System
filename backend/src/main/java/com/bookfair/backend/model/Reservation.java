package com.bookfair.backend.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.lang.NonNull;

import java.time.LocalDateTime;

@Entity
@Table(name = "reservations")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    @NonNull
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "stall_id", nullable = false)
    @NonNull
    private Stall stall;

    private LocalDateTime reservedAt;
}
