package com.topolski.backend.model.product.dto.review;

public record ReviewWithProductNameDTO(
        Long id,
        String username,
        String comment,
        Integer rating,
        String productName) {
}
