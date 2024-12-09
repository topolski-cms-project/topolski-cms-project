package com.topolski.backend.controller;

import com.topolski.backend.model.product.entity.ImageUrl;
import com.topolski.backend.model.product.entity.Product;
import com.topolski.backend.model.product.entity.Review;
import com.topolski.backend.model.product.entity.TechnicalDetails;
import com.topolski.backend.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.nullValue;

public class ProductControllerTest extends BaseController {
    private final ProductRepository productRepository;

    private Product product1;

    @Autowired
    public ProductControllerTest(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Test
    public void testGetAllProducts() {
        productRepository.saveAll(prepareProducts());

        given()
                .contentType(MediaType.APPLICATION_JSON.toString())
                .when()
                .get("/products")
                .then()
                .statusCode(HttpStatus.OK.value())
                .body("[0].name", equalTo("Wooden Table"))
                .body("[0].price", equalTo(150.0f))
                .body("[0].imageUrls[0]", equalTo("http://example.com/img1"))
                .body("[0].ratingScore", equalTo(5.0f))
                .body("[1].name", equalTo("Wooden board"))
                .body("[1].price", equalTo(75.0f))
                .body("[1].imageUrls[0]", equalTo("http://example.com/img2"))
                .body("[1].ratingScore", equalTo(0.0f))
                .body("[0].material", nullValue())
                .body("[0].width", nullValue())
                .body("[0].height", nullValue())
                .body("[0].depth", nullValue())
                .body("[0].description", nullValue())
                .body("[1].material", nullValue())
                .body("[1].width", nullValue())
                .body("[1].height", nullValue())
                .body("[1].depth", nullValue())
                .body("[1].description", nullValue());
    }

    @Test
    public void testGetProductDetails() {
        productRepository.saveAll(prepareProducts());

        given()
                .contentType(MediaType.APPLICATION_JSON.toString())
                .when()
                .get("/products/" + product1.getId())
                .then()
                .statusCode(HttpStatus.OK.value())
                .body("name", equalTo("Wooden Table"))
                .body("price", equalTo(150.0f))
                .body("imageUrls[0]", equalTo("http://example.com/img1"))
                .body("reviews[0].username", equalTo("Szczepan"))
                .body("reviews[0].comment", equalTo("Excellent product!"))
                .body("reviews[0].imageUrl", equalTo("Not yet implemented"))
                .body("reviews[0].rating", equalTo(5))
                .body("material", equalTo("Wood"))
                .body("width", equalTo(50.0f))
                .body("height", equalTo(40.0f))
                .body("depth", equalTo(0.5f))
                .body("description", equalTo("High quality wood table."));
    }


    @Test
    public void testGetProductByIdNotFound() {
        given()
                .contentType(MediaType.APPLICATION_JSON.toString())
                .when()
                .get("/products/999")
                .then()
                .statusCode(HttpStatus.NOT_FOUND.value());
    }

    private List<Product> prepareProducts() {
        ImageUrl imageUrl = ImageUrl.builder()
                .url("http://example.com/img1")
                .build();

        Review review = Review.builder()
                .rating(5)
                .comment("Excellent product!")
                .username("Szczepan")
                .createdAt(LocalDateTime.of(2024, 12, 9, 0, 0))
                .build();

        product1 = Product.builder()
                .name("Wooden Table")
                .price(new BigDecimal("150.00"))
                .imageUrls(Set.of(imageUrl))
                .technicalDetails(new TechnicalDetails("Wood", 50.0, 40.0, 0.5, "High quality wood table."))
                .reviews(Set.of(review))
                .build();

        imageUrl.setProduct(product1);
        review.setProduct(product1);

        ImageUrl imageUrl2 = ImageUrl.builder()
                .url("http://example.com/img2")
                .build();

        Product product2 = Product.builder()
                .name("Wooden board")
                .price(new BigDecimal("75.00"))
                .imageUrls(Set.of(imageUrl2))
                .reviews(Set.of())
                .build();

        imageUrl2.setProduct(product2);

        return Arrays.asList(product1, product2);
    }
}
