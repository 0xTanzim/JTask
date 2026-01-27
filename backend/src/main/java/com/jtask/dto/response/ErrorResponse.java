package com.jtask.dto.response;

public record ErrorResponse(
    String error,
    String message
) {}
