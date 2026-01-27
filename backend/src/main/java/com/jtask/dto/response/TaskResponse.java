package com.jtask.dto.response;

import com.jtask.domain.Task;

public record TaskResponse(
    String id,
    String title,
    String description,
    String status,
    String priority,
    String categoryId,
    String dueDate,
    String createdAt,
    int commentCount
) {
    public static TaskResponse from(Task task) {
        return new TaskResponse(
            task.id().toString(),
            task.title(),
            task.description(),
            task.status(),
            task.priority(),
            task.categoryId() != null ? task.categoryId().toString() : null,
            task.dueDate() != null ? task.dueDate().toString() : null,
            task.createdAt().toString(),
            0
        );
    }
}
