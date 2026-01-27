package com.jtask.dto.request;

public record LoginRequest(
    String email,
    String password
) {}
