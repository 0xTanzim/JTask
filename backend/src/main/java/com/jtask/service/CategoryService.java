package com.jtask.service;

import com.jtask.domain.Category;
import com.jtask.dto.request.CreateCategoryRequest;
import com.jtask.dto.request.UpdateCategoryRequest;
import com.jtask.repository.CategoryRepository;

import java.util.List;

public class CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryService() {
        this.categoryRepository = new CategoryRepository();
    }

    public List<Category> getUserCategories(Long userId) {
        return categoryRepository.findByUserId(userId);
    }

    public Category createCategory(Long userId, CreateCategoryRequest request) {
        if (request.name() == null || request.name().isBlank()) {
            throw new IllegalArgumentException("Category name is required");
        }
        return categoryRepository.create(userId, request.name(), request.color(), request.icon());
    }

    public void updateCategory(Long categoryId, Long userId, UpdateCategoryRequest request) {
        Category existing = categoryRepository.findById(categoryId, userId)
            .orElseThrow(() -> new IllegalArgumentException("Category not found"));

        categoryRepository.update(
            categoryId,
            userId,
            request.name() != null ? request.name() : existing.name(),
            request.color() != null ? request.color() : existing.color(),
            request.icon() != null ? request.icon() : existing.icon()
        );
    }

    public void deleteCategory(Long categoryId, Long userId) {
        categoryRepository.delete(categoryId, userId);
    }
}
