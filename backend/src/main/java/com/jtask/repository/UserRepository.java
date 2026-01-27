package com.jtask.repository;

import com.jtask.domain.User;
import io.axiom.persistence.jdbc.Jdbc;
import io.axiom.persistence.tx.Transaction;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.Instant;
import java.util.Optional;

public class UserRepository {

    public Optional<User> findByEmail(String email) {
        return Transaction.execute(() ->
            Jdbc.query(
                "SELECT * FROM users WHERE email = ?",
                this::mapUser,
                email
            ).stream().findFirst()
        );
    }

    public Optional<User> findById(Long id) {
        return Transaction.execute(() ->
            Jdbc.query(
                "SELECT * FROM users WHERE id = ?",
                this::mapUser,
                id
            ).stream().findFirst()
        );
    }

    public User create(String email, String passwordHash, String name) {
        return Transaction.execute(() -> {
            long id = Jdbc.insertAndReturnKey(
                "INSERT INTO users (email, password_hash, name, created_at, updated_at) VALUES (?, ?, ?, ?, ?)",
                email, passwordHash, name, Instant.now(), Instant.now()
            );

            return new User(
                id,
                email,
                passwordHash,
                name,
                null,
                Instant.now(),
                Instant.now()
            );
        });
    }

    private User mapUser(ResultSet rs) throws SQLException {
        return new User(
            rs.getLong("id"),
            rs.getString("email"),
            rs.getString("password_hash"),
            rs.getString("name"),
            rs.getString("avatar"),
            rs.getTimestamp("created_at").toInstant(),
            rs.getTimestamp("updated_at").toInstant()
        );
    }
}
