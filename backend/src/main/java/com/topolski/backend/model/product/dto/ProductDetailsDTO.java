package com.topolski.backend.model.product.dto;

import com.fasterxml.jackson.annotation.JsonUnwrapped;
import com.topolski.backend.model.product.entity.TechnicalDetails;

import java.math.BigDecimal;
import java.util.List;

public record ProductDetailsDTO(Long id, String name, BigDecimal price, List<String> imageUrls,
                                @JsonUnwrapped TechnicalDetails technicalDetails) {
}