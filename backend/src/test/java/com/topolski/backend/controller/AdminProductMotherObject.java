package com.topolski.backend.controller;

import com.topolski.backend.model.dto.product.ProductRequest;
import com.topolski.backend.model.entity.ImageUrl;
import com.topolski.backend.model.entity.Product;
import com.topolski.backend.model.entity.Review;
import com.topolski.backend.model.entity.TechnicalDetails;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

public class AdminProductMotherObject {

    public static String TEST_IMAGE_NAME = "test-image.jpg";

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

    public static List<Product> prepareProducts() {
        Product product1 = Product.builder()
                .name("product 1")
                .price(new BigDecimal("150.00"))
                .stockQuantity(1)
                .imageUrls(Set.of())
                .technicalDetails(new TechnicalDetails("Wood", 50.0, 40.0, 0.5, "High quality wood product 1."))
                .reviews(Set.of())
                .build();
        ImageUrl imageUrl1 = ImageUrl.builder()
                .url(TEST_IMAGE_NAME)
                .product(product1)
                .build();

        Review review1 = Review.builder()
                .product(product1)
                .comment("someComment")
                .rating(5)
                .username("Test-user")
                .imageUrl(TEST_IMAGE_NAME)
                .build();
        product1.setReviews(Set.of(review1));
        product1.setImageUrls(Set.of(imageUrl1));

        Product product2 = Product.builder()
                .name("product 2")
                .price(new BigDecimal("150.00"))
                .stockQuantity(1)
                .imageUrls(Set.of())
                .technicalDetails(new TechnicalDetails("Wood", 50.0, 40.0, 0.5, "High quality wood product 2."))
                .reviews(Set.of())
                .build();
        ImageUrl imageUrl2 = ImageUrl.builder()
                .url(TEST_IMAGE_NAME)
                .product(product2)
                .build();

        Review review2 = Review.builder()
                .product(product2)
                .comment("someComment")
                .rating(5)
                .username("Test-user")
                .imageUrl(TEST_IMAGE_NAME)
                .build();
        product2.setReviews(Set.of(review2));
        product2.setImageUrls(Set.of(imageUrl2));
        return List.of(product1, product2);
    }
}
