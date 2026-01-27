package com.jtask.dto.request;

public record CreateCategoryRequest(
    String name,
    String color,
    String icon
) {
}
