package com.jtask.repository;

import com.jtask.domain.Category;
import io.axiom.persistence.jdbc.Jdbc;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

public class CategoryRepository {

    public List<Category> findByUserId(Long userId) {
        return Jdbc.query(
            "SELECT * FROM categories WHERE user_id = ? ORDER BY created_at DESC",
            this::mapCategory,
            userId
        );
    }

    public Optional<Category> findById(Long id, Long userId) {
        List<Category> results = Jdbc.query(
            "SELECT * FROM categories WHERE id = ? AND user_id = ?",
            this::mapCategory,
            id,
            userId
        );
        return results.isEmpty() ? Optional.empty() : Optional.of(results.get(0));
    }

    public Category create(Long userId, String name, String color, String icon) {
        Instant now = Instant.now();
        long id = Jdbc.insertAndReturnKey(
            "INSERT INTO categories (user_id, name, color, icon, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)",
            userId,
            name,
            color != null ? color : "text-blue-500",
            icon,
            Timestamp.from(now),
            Timestamp.from(now)
        );
        return new Category(id, userId, name, color, icon, now, now);
    }

    public void update(Long id, Long userId, String name, String color, String icon) {
        Jdbc.update(
            "UPDATE categories SET name = ?, color = ?, icon = ?, updated_at = ? WHERE id = ? AND user_id = ?",
            name,
            color,
            icon,
            Timestamp.from(Instant.now()),
            id,
            userId
        );
    }

    public void delete(Long id, Long userId) {
        Jdbc.update(
            "DELETE FROM categories WHERE id = ? AND user_id = ?",
            id,
            userId
        );
    }

    private Category mapCategory(ResultSet rs) throws SQLException {
        return new Category(
            rs.getLong("id"),
            rs.getLong("user_id"),
            rs.getString("name"),
            rs.getString("color"),
            rs.getString("icon"),
            rs.getTimestamp("created_at").toInstant(),
            rs.getTimestamp("updated_at").toInstant()
        );
    }
}
