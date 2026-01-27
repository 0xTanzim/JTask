package com.jtask.domain;

import java.time.Instant;

public record Task(
    Long id,
    Long userId,
    Long categoryId,
    String title,
    String description,
    String status,
    String priority,
    Instant dueDate,
    Instant createdAt,
    Instant updatedAt
) {
}
