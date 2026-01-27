package com.jtask.dto.request;

public record UpdateCategoryRequest(
    String name,
    String color,
    String icon
) {
}
