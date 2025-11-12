package com.bookfair.backend.config;

import com.bookfair.backend.domain.Stall;
import com.bookfair.backend.domain.User;
import com.bookfair.backend.domain.enums.StallSize;
import com.bookfair.backend.domain.enums.StallStatus;
import com.bookfair.backend.repository.StallRepository;
import com.bookfair.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.stream.IntStream;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seed(StallRepository stallRepo,
            UserRepository userRepo,
            BCryptPasswordEncoder encoder) {
        return args -> {
            // Create admin user using existing schema
            if (userRepo.findByEmail("admin@bookfair.com").isEmpty()) {
                userRepo.save(User.builder()
                        .email("admin@bookfair.com")
                        .password(encoder.encode("admin123"))
                        .fullName("Book Fair Administrator")
                        .role(User.Role.ADMIN)
                        .build());
                System.out.println("✅ Admin user created: admin@bookfair.com / admin123");
            }

            // Create sample stalls
            if (stallRepo.count() == 0) {
                IntStream.rangeClosed(1, 15).forEach(i -> {
                    StallSize size = i <= 5 ? StallSize.SMALL : (i <= 10 ? StallSize.MEDIUM : StallSize.LARGE);
                    stallRepo.save(Stall.builder()
                            .name("A" + i)
                            .size(size)
                            .status(StallStatus.AVAILABLE)
                            .build());
                });
                System.out.println("✅ Created 15 sample stalls");
            }
        };
    }
}