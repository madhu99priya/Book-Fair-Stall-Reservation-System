package com.bookfair.backend.service;

import com.bookfair.backend.domain.Role;
import com.bookfair.backend.domain.User;
import com.bookfair.backend.domain.enums.RoleName;
import com.bookfair.backend.dto.user.RoleUpdateRequest;
import com.bookfair.backend.exception.ResourceNotFoundException;
import com.bookfair.backend.repository.RoleRepository;
import com.bookfair.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public UserService(UserRepository userRepository,
            RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    public List<User> listAll() {
        return userRepository.findAll();
    }

    public User updateRoles(Long userId, RoleUpdateRequest req) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Set<Role> newRoles = req.getRoles().stream()
                .map(r -> roleRepository.findByName(RoleName.valueOf(r)))
                .flatMap(Optional::stream)
                .collect(Collectors.toSet());
        user.setRoles(newRoles);
        return userRepository.save(user);
    }
}