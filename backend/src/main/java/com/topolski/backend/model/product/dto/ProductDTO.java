package com.topolski.backend.model.product.dto;


import java.math.BigDecimal;

public record ProductDTO(Long id, String name, BigDecimal price, String imageUrl) {
}