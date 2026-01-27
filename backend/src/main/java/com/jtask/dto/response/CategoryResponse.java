package com.jtask.dto.response;

import com.jtask.domain.Category;

public record CategoryResponse(
    String id,
    String name,
    String color,
    String icon
) {
    public static CategoryResponse from(Category category) {
        return new CategoryResponse(
            category.id().toString(),
            category.name(),
            category.color(),
            category.icon()
        );
    }
}
