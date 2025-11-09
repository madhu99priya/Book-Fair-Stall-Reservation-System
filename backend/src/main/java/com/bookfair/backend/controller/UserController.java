package com.bookfair.backend.controller;

import com.bookfair.backend.domain.User;
import com.bookfair.backend.dto.user.RoleUpdateRequest;
import com.bookfair.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> list() {
        return userService.listAll();
    }

    @PutMapping("/{id}/roles")
    public User updateRoles(@PathVariable Long id, @Valid @RequestBody RoleUpdateRequest req) {
        return userService.updateRoles(id, req);
    }
}