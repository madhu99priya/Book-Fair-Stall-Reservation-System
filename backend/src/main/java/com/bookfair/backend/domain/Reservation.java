package com.bookfair.backend.domain;

import com.bookfair.backend.domain.enums.ReservationStatus;
import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private User user;

    @ManyToMany
    @JoinTable(name = "reservation_stalls", joinColumns = @JoinColumn(name = "reservation_id"), inverseJoinColumns = @JoinColumn(name = "stall_id"))
    private Set<Stall> stalls;

    @Enumerated(EnumType.STRING)
    private ReservationStatus status = ReservationStatus.CONFIRMED;

    private Instant createdAt = Instant.now();

    private boolean emailSent;

    @Lob
    private byte[] qrCode;
}