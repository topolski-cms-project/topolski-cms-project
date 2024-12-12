package com.topolski.backend.model.product.dto.product;

import com.fasterxml.jackson.annotation.JsonUnwrapped;
import com.topolski.backend.model.product.entity.TechnicalDetails;

import java.math.BigDecimal;

public record ProductTechnicalDetailsDTO(
        Long id,
        String name,
        BigDecimal price,
        Integer stockQuantity,
        @JsonUnwrapped TechnicalDetails technicalDetails) {
}
