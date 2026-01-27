package com.jtask.dto.request;

public record CreateTaskRequest(
    String title,
    String description,
    String status,
    String priority,
    String categoryId,
    String dueDate
) {
}
