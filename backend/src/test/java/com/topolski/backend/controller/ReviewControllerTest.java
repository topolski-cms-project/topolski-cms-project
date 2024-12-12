package com.topolski.backend.controller;

import com.topolski.backend.model.product.dto.review.ReviewRequest;
import com.topolski.backend.model.product.entity.Product;
import com.topolski.backend.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import java.math.BigDecimal;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.containsString;


public class ReviewControllerTest extends BaseController {
    @Autowired
    private ProductRepository productRepository;

    @Test
    public void testAddReview() {
        Product product = new Product();
        product.setName("Test Product");
        product.setPrice(BigDecimal.valueOf(99.99));

        productRepository.save(product);

        given()
                .contentType(MediaType.APPLICATION_JSON.toString())
                .body(getReviewRequest(product.getId()))
                .when()
                .post("/reviews")
                .then()
                .statusCode(HttpStatus.CREATED.value())
                .body(containsString("Review created successfully."));
    }

    @Test
    public void testAddReviewShouldReturnProductNotFound() {
        given()
                .contentType(MediaType.APPLICATION_JSON.toString())
                .body(getReviewRequest(999L))
                .when()
                .post("/reviews")
                .then()
                .statusCode(HttpStatus.NOT_FOUND.value())
                .body(containsString("Product with the given ID was not found."));
    }

    private ReviewRequest getReviewRequest(Long productId) {
        return ReviewRequest.builder()
                .productId(productId)
                .reviewerName("Test user")
                .reviewText("Excellent product!")
                .rating(5)
                .build();
    }
}
