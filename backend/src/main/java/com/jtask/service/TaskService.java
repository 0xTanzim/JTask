package com.jtask.service;

import com.jtask.domain.Task;
import com.jtask.dto.request.CreateTaskRequest;
import com.jtask.dto.request.UpdateTaskRequest;
import com.jtask.repository.TaskRepository;

import java.time.Instant;
import java.util.List;

public class TaskService {
    private final TaskRepository taskRepository;

    public TaskService() {
        this.taskRepository = new TaskRepository();
    }

    public List<Task> getUserTasks(Long userId) {
        return taskRepository.findByUserId(userId);
    }

    public List<Task> getCategoryTasks(Long categoryId, Long userId) {
        return taskRepository.findByCategoryId(categoryId, userId);
    }

    public Task createTask(Long userId, CreateTaskRequest request) {
        if (request.title() == null || request.title().isBlank()) {
            throw new IllegalArgumentException("Task title is required");
        }

        Long categoryId = request.categoryId() != null && !request.categoryId().isBlank()
            ? Long.parseLong(request.categoryId())
            : null;

        Instant dueDate = request.dueDate() != null && !request.dueDate().isBlank()
            ? Instant.parse(request.dueDate())
            : null;

        return taskRepository.create(
            userId,
            request.title(),
            request.description(),
            request.status(),
            request.priority(),
            categoryId,
            dueDate
        );
    }

    public void updateTask(Long taskId, Long userId, UpdateTaskRequest request) {
        Task existing = taskRepository.findById(taskId, userId)
            .orElseThrow(() -> new IllegalArgumentException("Task not found"));

        Long categoryId = request.categoryId() != null && !request.categoryId().isBlank()
            ? Long.parseLong(request.categoryId())
            : existing.categoryId();

        Instant dueDate = request.dueDate() != null && !request.dueDate().isBlank()
            ? Instant.parse(request.dueDate())
            : existing.dueDate();

        taskRepository.update(
            taskId,
            userId,
            request.title() != null ? request.title() : existing.title(),
            request.description() != null ? request.description() : existing.description(),
            request.status() != null ? request.status() : existing.status(),
            request.priority() != null ? request.priority() : existing.priority(),
            categoryId,
            dueDate
        );
    }

    public void deleteTask(Long taskId, Long userId) {
        taskRepository.delete(taskId, userId);
    }
}
