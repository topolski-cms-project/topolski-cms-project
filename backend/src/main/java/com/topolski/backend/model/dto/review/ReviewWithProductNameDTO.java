package com.topolski.backend.model.dto.review;

public record ReviewWithProductNameDTO(
        Long id,
        String username,
        String comment,
        Integer rating,
        String productName,
        String imageUrl) {
}
