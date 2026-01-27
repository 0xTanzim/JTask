package com.jtask.controller;

import com.jtask.domain.Category;
import com.jtask.dto.request.CreateCategoryRequest;
import com.jtask.dto.request.UpdateCategoryRequest;
import com.jtask.dto.response.CategoryResponse;
import com.jtask.security.JwtUtil;
import com.jtask.service.CategoryService;
import io.axiom.core.context.Context;
import io.axiom.persistence.tx.Transaction;

import java.util.List;

public class CategoryController {
    private final CategoryService categoryService;

    public CategoryController() {
        this.categoryService = new CategoryService();
    }

    public void getAll(Context ctx) {
        Long userId = getUserIdFromToken(ctx);
        if (userId == null) return;

        try {
            List<CategoryResponse> categories = Transaction.execute(() ->
                categoryService.getUserCategories(userId).stream()
                    .map(CategoryResponse::from)
                    .toList()
            );

            ctx.json(categories);
        } catch (Exception e) {
            System.err.println("[ERROR] Failed to get categories for user " + userId);
            e.printStackTrace();
            ctx.status(500);
            ctx.json(new ErrorResponse("Internal server error: " + e.getMessage()));
        }
    }

    public void create(Context ctx) {
        Long userId = getUserIdFromToken(ctx);
        if (userId == null) return;

        CreateCategoryRequest request = ctx.body(CreateCategoryRequest.class);

        CategoryResponse response = Transaction.execute(() -> {
            Category category = categoryService.createCategory(userId, request);
            return CategoryResponse.from(category);
        });

        ctx.status(201);
        ctx.json(response);
    }

    public void update(Context ctx) {
        Long userId = getUserIdFromToken(ctx);
        if (userId == null) return;

        Long categoryId = Long.parseLong(ctx.param("id"));
        UpdateCategoryRequest request = ctx.body(UpdateCategoryRequest.class);

        Transaction.execute(() -> {
            categoryService.updateCategory(categoryId, userId, request);
        });

        ctx.status(204);
    }

    public void delete(Context ctx) {
        Long userId = getUserIdFromToken(ctx);
        if (userId == null) return;

        Long categoryId = Long.parseLong(ctx.param("id"));

        Transaction.execute(() -> {
            categoryService.deleteCategory(categoryId, userId);
        });

        ctx.status(204);
    }

    private Long getUserIdFromToken(Context ctx) {
        String authHeader = ctx.header("authorization");  // lowercase - Axiom maps it this way

        if (authHeader == null) {
            System.err.println("[ERROR] No authorization header");
            ctx.status(401);
            ctx.json(new ErrorResponse("Unauthorized - No header"));
            return null;
        }

        if (!authHeader.startsWith("Bearer ")) {
            System.err.println("[ERROR] Invalid authorization format: " + authHeader);
            ctx.status(401);
            ctx.json(new ErrorResponse("Unauthorized - Invalid format"));
            return null;
        }

        String token = authHeader.substring(7);

        try {
            Long userId = JwtUtil.getUserId(token);
            System.out.println("[DEBUG] JWT validated, userId: " + userId);
            return userId;
        } catch (Exception e) {
            System.err.println("[ERROR] JWT validation failed: " + e.getMessage());
            e.printStackTrace();
            ctx.status(401);
            ctx.json(new ErrorResponse("Unauthorized - Invalid token"));
            return null;
        }
    }

    private record ErrorResponse(String message) {}
}
