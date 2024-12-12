package com.topolski.backend.controller;

import com.topolski.backend.model.dto.product.ProductRequest;
import com.topolski.backend.model.entity.Product;
import com.topolski.backend.model.entity.TechnicalDetails;

import java.math.BigDecimal;
import java.util.Set;

public class AdminProductMotherObject {

    public static ProductRequest correctProductRequest() {
        return ProductRequest.builder()
                .name("Wood product")
                .price(19.99)
                .material("Wood")
                .description("Some description")
                .width(1.5)
                .height(5.0)
                .depth(0.5)
                .quantity(1)
                .build();
    }

    public static ProductRequest correctProductUpdateRequest() {
        return ProductRequest.builder()
                .name("Updated Product A")
                .price(120.0)
                .material("Plastic")
                .description("An updated version of Product A")
                .width(1.0)
                .height(0.9)
                .depth(0.1)
                .quantity(0)
                .build();
    }

    public static ProductRequest invalidProductMissingName() {
        return ProductRequest.builder()
                .price(19.99)
                .material("Wood")
                .description("Some description")
                .width(1.5)
                .height(5.0)
                .depth(0.5)
                .quantity(1)
                .build();
    }

    public static ProductRequest invalidProductNegativePrice() {
        return ProductRequest.builder()
                .name("Wood product")
                .price(-19.99)
                .material("Wood")
                .description("Some description")
                .width(1.5)
                .height(5.0)
                .depth(0.5)
                .quantity(1)
                .build();
    }

    public static Product prepareProduct() {
        return Product.builder()
                .name("Wooden Table")
                .price(new BigDecimal("150.00"))
                .stockQuantity(1)
                .imageUrls(Set.of())
                .technicalDetails(new TechnicalDetails("Wood", 50.0, 40.0, 0.5, "High quality wood table."))
                .reviews(Set.of())
                .build();
    }
}
