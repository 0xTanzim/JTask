package com.jtask.controller;

import com.jtask.domain.Task;
import com.jtask.dto.request.CreateTaskRequest;
import com.jtask.dto.request.UpdateTaskRequest;
import com.jtask.dto.response.TaskResponse;
import com.jtask.security.JwtUtil;
import com.jtask.service.TaskService;
import io.axiom.core.context.Context;
import io.axiom.persistence.tx.Transaction;

import java.util.List;

public class TaskController {
    private final TaskService taskService;

    public TaskController() {
        this.taskService = new TaskService();
    }

    public void getAll(Context ctx) {
        Long userId = getUserIdFromToken(ctx);
        if (userId == null) return;

        String categoryId = ctx.query("categoryId");

        List<TaskResponse> tasks = Transaction.execute(() -> {
            if (categoryId != null && !categoryId.isBlank()) {
                return taskService.getCategoryTasks(Long.parseLong(categoryId), userId).stream()
                    .map(TaskResponse::from)
                    .toList();
            }
            return taskService.getUserTasks(userId).stream()
                .map(TaskResponse::from)
                .toList();
        });

        ctx.json(tasks);
    }

    public void create(Context ctx) {
        Long userId = getUserIdFromToken(ctx);
        if (userId == null) return;

        CreateTaskRequest request = ctx.body(CreateTaskRequest.class);

        TaskResponse response = Transaction.execute(() -> {
            Task task = taskService.createTask(userId, request);
            return TaskResponse.from(task);
        });

        ctx.status(201);
        ctx.json(response);
    }

    public void update(Context ctx) {
        Long userId = getUserIdFromToken(ctx);
        if (userId == null) return;

        Long taskId = Long.parseLong(ctx.param("id"));
        UpdateTaskRequest request = ctx.body(UpdateTaskRequest.class);

        Transaction.execute(() -> {
            taskService.updateTask(taskId, userId, request);
        });

        ctx.status(204);
    }

    public void delete(Context ctx) {
        Long userId = getUserIdFromToken(ctx);
        if (userId == null) return;

        Long taskId = Long.parseLong(ctx.param("id"));

        Transaction.execute(() -> {
            taskService.deleteTask(taskId, userId);
        });

        ctx.status(204);
    }

    private Long getUserIdFromToken(Context ctx) {
        String authHeader = ctx.header("authorization");  // lowercase - Axiom maps it this way

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            ctx.status(401);
            ctx.json(new ErrorResponse("Unauthorized"));
            return null;
        }

        String token = authHeader.substring(7);
        try {
            return JwtUtil.getUserId(token);
        } catch (Exception e) {
            System.err.println("JWT validation failed: " + e.getMessage());
            ctx.status(401);
            ctx.json(new ErrorResponse("Unauthorized"));
            return null;
        }
    }

    private record ErrorResponse(String message) {}
}
