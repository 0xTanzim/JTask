package com.jtask.domain;

import java.time.Instant;

public record User(
    Long id,
    String email,
    String passwordHash,
    String name,
    String avatar,
    Instant createdAt,
    Instant updatedAt
) {
    public User withId(Long id) {
        return new User(id, email, passwordHash, name, avatar, createdAt, updatedAt);
    }

    public User withoutPassword() {
        return new User(id, email, null, name, avatar, createdAt, updatedAt);
    }
}
