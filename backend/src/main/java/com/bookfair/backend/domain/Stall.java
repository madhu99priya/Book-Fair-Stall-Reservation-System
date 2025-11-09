package com.bookfair.backend.domain;

import com.bookfair.backend.domain.enums.StallSize;
import com.bookfair.backend.domain.enums.StallStatus;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Stall {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    private StallSize size;

    @Enumerated(EnumType.STRING)
    private StallStatus status = StallStatus.AVAILABLE;
}