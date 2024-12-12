package com.topolski.backend.controller;

import com.topolski.backend.model.entity.Product;
import com.topolski.backend.repository.ProductRepository;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import static com.topolski.backend.controller.AdminProductMotherObject.correctProductRequest;
import static com.topolski.backend.controller.AdminProductMotherObject.correctProductUpdateRequest;
import static com.topolski.backend.controller.AdminProductMotherObject.invalidProductMissingName;
import static com.topolski.backend.controller.AdminProductMotherObject.invalidProductNegativePrice;
import static com.topolski.backend.controller.AdminProductMotherObject.prepareProduct;
import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

class AdminControllerTest extends BaseController {

    private static final String BASE_URL = "/private/admin";
    private final ProductRepository productRepository;

    @Autowired
    public AdminControllerTest(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Test
    public void testCreateProduct() {
        given()
                .contentType(ContentType.JSON)
                .body(correctProductRequest())
                .when()
                .post(BASE_URL + "/products")
                .then()
                .statusCode(201)
                .body("message", equalTo("Product added successfully"));
    }

    @Test
    public void testCreateProductInvalid_MissingName() {
        given()
                .contentType(ContentType.JSON)
                .body(invalidProductMissingName())
                .when()
                .post(BASE_URL + "/products")
                .then()
                .statusCode(400)
                .body("name", equalTo("Product name cannot be blank"));
    }

    @Test
    public void testUpdateProduct() {
        Product saved = productRepository.save(prepareProduct());

        given()
                .contentType(ContentType.JSON)
                .body(correctProductUpdateRequest())
                .when()
                .put(BASE_URL + "/products/" + saved.getId())
                .then()
                .statusCode(200)
                .body("name", equalTo("Updated Product A"))
                .body("price", equalTo(120.0f))
                .body("material", equalTo("Plastic"))
                .body("description", equalTo("An updated version of Product A"))
                .body("width", equalTo(1.0f))
                .body("height", equalTo(0.9f))
                .body("depth", equalTo(0.1f))
                .body("stockQuantity", equalTo(1));
    }

    @Test
    public void testUpdateProductNotFound() {
        given()
                .contentType(ContentType.JSON)
                .body(correctProductUpdateRequest())
                .when()
                .put(BASE_URL + "/products/9999")  // Assuming product with ID 9999 doesn't exist
                .then()
                .statusCode(HttpStatus.NOT_FOUND.value())
                .body("message", equalTo("Product with the given ID was not found."));
    }

    @Test
    public void testUpdateProductInvalidInput() {
        given()
                .contentType(ContentType.JSON)
                .body(invalidProductNegativePrice())
                .when()
                .put(BASE_URL + "/products/1")  // Assuming product with ID 1 exists
                .then()
                .statusCode(400)  // Bad Request
                .body("price", equalTo("Price must be at least 0"));
    }
}