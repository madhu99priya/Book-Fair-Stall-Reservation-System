package com.bookfair.backend.service;

import com.bookfair.backend.model.Genre;
import com.bookfair.backend.model.User;
import com.bookfair.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;


import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final GenreService genreService;

    // Register a new user
    public User registerUser(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,"Email already exists");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if (user.getRole() == null) {
            user.setRole(User.Role.EXHIBITOR);
        }

        if (user.getContactNumber() == null || user.getContactNumber().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Contact number is required");
        }

        if (!user.getContactNumber().matches("^\\+?\\d{10,15}$")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid contact number format");
        }

        return userRepository.save(user);
    }

    // Login and generate JWT token
    public String login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        return jwtService.generateToken(user);
    }

    // Fetch all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    // Fetch user by ID
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // Delete user
    public void deleteUser(Long id) {
        User user = getUserById(id);
        userRepository.delete(user);
    }
    
    // Update user
    public User updateUser(User updatedUser) {
        User user = userRepository.findById(updatedUser.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (updatedUser.getFullName() != null) user.setFullName(updatedUser.getFullName());
        if (updatedUser.getEmail() != null) user.setEmail(updatedUser.getEmail());
        if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
        }

        if (updatedUser.getContactNumber() != null) {
            user.setContactNumber(updatedUser.getContactNumber());
        }

        return userRepository.save(user);
    }

        public User updateUserRole(Long id, User.Role newRole) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setRole(newRole);
        return userRepository.save(user);
    }


    public void changePassword(String email, String oldPassword, String newPassword) {
        User user = getUserByEmail(email);

        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new RuntimeException("Old password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }
    
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .roles(user.getRole().name())
                .build();
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Transactional
    public User updateGenresForCurrentUser(List<String> genreNames, String email) {
        User user = getUserByEmail(email);

        List<Genre> newGenres = genreNames.stream()
                .map(name -> genreService.getOrCreateGenre(name))
                .collect(Collectors.toList());

        List<Genre> mergedGenres = user.getGenres() == null
                ? new ArrayList<>(newGenres)
                : Stream.concat(user.getGenres().stream(), newGenres.stream())
                        .distinct()
                        .collect(Collectors.toCollection(ArrayList::new));

        user.setGenres(mergedGenres);

        return userRepository.save(user);
    }
}
