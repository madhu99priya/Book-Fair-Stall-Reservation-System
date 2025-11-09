package com.bookfair.backend.config;

import com.bookfair.backend.domain.Role;
import com.bookfair.backend.domain.Stall;
import com.bookfair.backend.domain.User;
import com.bookfair.backend.domain.enums.RoleName;
import com.bookfair.backend.domain.enums.StallSize;
import com.bookfair.backend.repository.RoleRepository;
import com.bookfair.backend.repository.StallRepository;
import com.bookfair.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Set;
import java.util.stream.IntStream;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seed(RoleRepository roleRepo,
            StallRepository stallRepo,
            UserRepository userRepo,
            BCryptPasswordEncoder encoder) {
        return args -> {
            Role adminRole = roleRepo.findByName(RoleName.ADMIN)
                    .orElseGet(() -> roleRepo.save(new Role(null, RoleName.ADMIN)));
            Role publisherRole = roleRepo.findByName(RoleName.PUBLISHER)
                    .orElseGet(() -> roleRepo.save(new Role(null, RoleName.PUBLISHER)));

            if (userRepo.findByUsername("admin").isEmpty()) {
                userRepo.save(User.builder()
                        .username("admin")
                        .email("admin@example.com")
                        .password(encoder.encode("admin123")) // change in production
                        .roles(Set.of(adminRole))
                        .enabled(true)
                        .build());
            }

            if (stallRepo.count() == 0) {
                IntStream.rangeClosed(1, 15).forEach(i -> {
                    StallSize size = i <= 5 ? StallSize.SMALL : (i <= 10 ? StallSize.MEDIUM : StallSize.LARGE);
                    stallRepo.save(Stall.builder()
                            .name("A" + i)
                            .size(size)
                            .build());
                });
            }
        };
    }
}