package com.topolski.backend.model.product.dto;


import java.math.BigDecimal;
import java.util.List;

public record ProductDTO(Long id, String name, BigDecimal price, List<String> imageUrls) {
}