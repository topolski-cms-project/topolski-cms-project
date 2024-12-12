package com.topolski.backend.model.product.dto.product;


import java.math.BigDecimal;
import java.util.List;

public record ProductDTO(
        Long id,
        String name,
        BigDecimal price,
        Integer stockQuantity,
        List<String> imageUrls,
        RatingScore ratingScore) {
}