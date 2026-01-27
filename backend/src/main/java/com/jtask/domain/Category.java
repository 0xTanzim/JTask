package com.jtask.domain;

import java.time.Instant;

public record Category(
    Long id,
    Long userId,
    String name,
    String color,
    String icon,
    Instant createdAt,
    Instant updatedAt
) {
    public Category withId(Long id) {
        return new Category(id, userId, name, color, icon, createdAt, updatedAt);
    }
}
