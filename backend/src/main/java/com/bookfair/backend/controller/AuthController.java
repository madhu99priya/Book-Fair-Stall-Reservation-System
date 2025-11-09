package com.bookfair.backend.controller;

import com.bookfair.backend.dto.auth.LoginRequest;
import com.bookfair.backend.dto.auth.TokenResponse;
import com.bookfair.backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public TokenResponse login(@Valid @RequestBody LoginRequest req) {
        return authService.login(req);
    }

    @GetMapping("/me")
    public Object me(Principal principal) {
        return authService.me(principal.getName());
    }
}