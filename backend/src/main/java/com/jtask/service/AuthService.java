package com.jtask.service;

import com.jtask.domain.User;
import com.jtask.dto.request.LoginRequest;
import com.jtask.dto.request.RegisterRequest;
import com.jtask.dto.response.AuthResponse;
import com.jtask.exception.AuthException;
import com.jtask.repository.UserRepository;
import com.jtask.security.JwtUtil;
import com.jtask.security.PasswordUtil;

import java.util.Optional;

public class AuthService {
    private final UserRepository userRepository;

    public AuthService() {
        this.userRepository = new UserRepository();
    }

    public AuthResponse register(RegisterRequest request) {
        if (request.email() == null || request.email().isBlank()) {
            throw new AuthException("Email is required");
        }

        if (request.password() == null || request.password().length() < 6) {
            throw new AuthException("Password must be at least 6 characters");
        }

        Optional<User> existing = userRepository.findByEmail(request.email());
        if (existing.isPresent()) {
            throw new AuthException("Email already registered");
        }

        String passwordHash = PasswordUtil.hash(request.password());
        User user = userRepository.create(request.email(), passwordHash, request.name());

        String token = JwtUtil.generateToken(user.id(), user.email());

        return AuthResponse.from(user.withoutPassword(), token);
    }

    public AuthResponse login(LoginRequest request) {
        if (request.email() == null || request.password() == null) {
            throw new AuthException("Email and password are required");
        }

        User user = userRepository.findByEmail(request.email())
            .orElseThrow(() -> new AuthException("Invalid credentials"));

        if (!PasswordUtil.verify(request.password(), user.passwordHash())) {
            throw new AuthException("Invalid credentials");
        }

        String token = JwtUtil.generateToken(user.id(), user.email());

        return AuthResponse.from(user.withoutPassword(), token);
    }
}
