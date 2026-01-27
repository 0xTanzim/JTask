package com.jtask.controller;

import com.jtask.dto.request.LoginRequest;
import com.jtask.dto.request.RegisterRequest;
import com.jtask.dto.response.AuthResponse;
import com.jtask.dto.response.ErrorResponse;
import com.jtask.exception.AuthException;
import com.jtask.service.AuthService;
import io.axiom.core.context.Context;

public class AuthController {
    private final AuthService authService;

    public AuthController() {
        this.authService = new AuthService();
    }

    public void register(Context ctx) {
        try {
            RegisterRequest request = ctx.body(RegisterRequest.class);
            AuthResponse response = authService.register(request);
            ctx.status(201);
            ctx.json(response);
        } catch (AuthException e) {
            ctx.status(400);
            ctx.json(new ErrorResponse("AUTH_ERROR", e.getMessage()));
        } catch (Exception e) {
            ctx.status(500);
            ctx.json(new ErrorResponse("SERVER_ERROR", "An error occurred"));
        }
    }

    public void login(Context ctx) {
        try {
            LoginRequest request = ctx.body(LoginRequest.class);
            AuthResponse response = authService.login(request);
            ctx.json(response);
        } catch (AuthException e) {
            ctx.status(401);
            ctx.json(new ErrorResponse("AUTH_ERROR", e.getMessage()));
        } catch (Exception e) {
            ctx.status(500);
            ctx.json(new ErrorResponse("SERVER_ERROR", "An error occurred"));
        }
    }
}
