package com.topolski.backend.model.product.dto.product;

import com.fasterxml.jackson.annotation.JsonUnwrapped;
import com.topolski.backend.model.product.dto.review.ReviewDTO;
import com.topolski.backend.model.product.entity.TechnicalDetails;

import java.math.BigDecimal;
import java.util.List;

public record ProductDetailsDTO(
        Long id,
        String name,
        BigDecimal price,
        Integer stockQuantity,
        List<String> imageUrls,
        @JsonUnwrapped TechnicalDetails technicalDetails,
        List<ReviewDTO> reviews) {
}