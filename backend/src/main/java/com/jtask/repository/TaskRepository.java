package com.jtask.repository;

import com.jtask.domain.Task;
import io.axiom.persistence.jdbc.Jdbc;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

public class TaskRepository {

    public List<Task> findByUserId(Long userId) {
        return Jdbc.query(
            "SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC",
            this::mapTask,
            userId
        );
    }

    public List<Task> findByCategoryId(Long categoryId, Long userId) {
        return Jdbc.query(
            "SELECT * FROM tasks WHERE category_id = ? AND user_id = ? ORDER BY created_at DESC",
            this::mapTask,
            categoryId,
            userId
        );
    }

    public Optional<Task> findById(Long id, Long userId) {
        List<Task> results = Jdbc.query(
            "SELECT * FROM tasks WHERE id = ? AND user_id = ?",
            this::mapTask,
            id,
            userId
        );
        return results.isEmpty() ? Optional.empty() : Optional.of(results.get(0));
    }

    public Task create(Long userId, String title, String description, String status, String priority, Long categoryId, Instant dueDate) {
        Instant now = Instant.now();
        try {
            System.out.println("[DEBUG] Creating task: userId=" + userId + ", title=" + title + ", categoryId=" + categoryId);
            long id = Jdbc.insertAndReturnKey(
                "INSERT INTO tasks (user_id, title, description, status, priority, category_id, due_date, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                userId,
                title,
                description,
                status != null ? status : "todo",
                priority != null ? priority : "medium",
                categoryId,
                dueDate != null ? Timestamp.from(dueDate) : null,
                Timestamp.from(now),
                Timestamp.from(now)
            );
            System.out.println("[DEBUG] Task created with id=" + id);
            return new Task(id, userId, categoryId, title, description, status, priority, dueDate, now, now);
        } catch (Exception e) {
            System.err.println("[ERROR] Task creation failed:");
            e.printStackTrace();
            throw e;
        }
    }

    public void update(Long id, Long userId, String title, String description, String status, String priority, Long categoryId, Instant dueDate) {
        Jdbc.update(
            "UPDATE tasks SET title = ?, description = ?, status = ?, priority = ?, category_id = ?, due_date = ?, updated_at = ? WHERE id = ? AND user_id = ?",
            title,
            description,
            status,
            priority,
            categoryId,
            dueDate != null ? Timestamp.from(dueDate) : null,
            Timestamp.from(Instant.now()),
            id,
            userId
        );
    }

    public void delete(Long id, Long userId) {
        Jdbc.update(
            "DELETE FROM tasks WHERE id = ? AND user_id = ?",
            id,
            userId
        );
    }

    private Task mapTask(ResultSet rs) throws SQLException {
        Timestamp dueDateTs = rs.getTimestamp("due_date");
        return new Task(
            rs.getLong("id"),
            rs.getLong("user_id"),
            (Long) rs.getObject("category_id"),
            rs.getString("title"),
            rs.getString("description"),
            rs.getString("status"),
            rs.getString("priority"),
            dueDateTs != null ? dueDateTs.toInstant() : null,
            rs.getTimestamp("created_at").toInstant(),
            rs.getTimestamp("updated_at").toInstant()
        );
    }
}
