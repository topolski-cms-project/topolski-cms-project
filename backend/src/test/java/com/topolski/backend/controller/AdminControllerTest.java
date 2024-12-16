package com.topolski.backend.controller;

import com.topolski.backend.model.entity.ImageUrl;
import com.topolski.backend.model.entity.Product;
import com.topolski.backend.model.entity.Review;
import com.topolski.backend.repository.ProductRepository;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import java.io.File;
import java.util.List;
import java.util.Objects;
import java.util.Set;

import static com.topolski.backend.controller.AdminProductMotherObject.TEST_IMAGE_NAME;
import static com.topolski.backend.controller.AdminProductMotherObject.correctProductRequest;
import static com.topolski.backend.controller.AdminProductMotherObject.correctProductUpdateRequest;
import static com.topolski.backend.controller.AdminProductMotherObject.invalidProductMissingName;
import static com.topolski.backend.controller.AdminProductMotherObject.invalidProductNegativePrice;
import static com.topolski.backend.controller.AdminProductMotherObject.prepareProduct;
import static com.topolski.backend.controller.AdminProductMotherObject.prepareProducts;
import static io.restassured.RestAssured.given;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.notNullValue;

class AdminControllerTest extends BaseController {

    private static final String BASE_URL = "/private/admin";
    private final ProductRepository productRepository;

    @Autowired
    public AdminControllerTest(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @AfterEach
    public void cleanup() {
        productRepository.deleteAll();
    }

    @Test
    void testCreateProduct() {
        given()
                .contentType(ContentType.JSON)
                .body(correctProductRequest())
                .when()
                .post(BASE_URL + "/products")
                .then()
                .statusCode(HttpStatus.CREATED.value())
                .body("id", notNullValue())
                .body("name", equalTo("Wood product"))
                .body("price", equalTo(19.99f))
                .body("material", equalTo("Wood"))
                .body("description", equalTo("Some description"))
                .body("width", equalTo(1.5f))
                .body("height", equalTo(5.0f))
                .body("depth", equalTo(0.5f))
                .body("stockQuantity", equalTo(1));
    }

    @Test
    void testCreateProductInvalid_MissingName() {
        given()
                .contentType(ContentType.JSON)
                .body(invalidProductMissingName())
                .when()
                .post(BASE_URL + "/products")
                .then()
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .body("name", equalTo("Product name cannot be blank"));
    }

    @Test
    void testUpdateProduct() {
        Product saved = productRepository.save(prepareProduct());

        given()
                .contentType(ContentType.JSON)
                .body(correctProductUpdateRequest())
                .when()
                .put(BASE_URL + "/products/" + saved.getId())
                .then()
                .statusCode(HttpStatus.OK.value())
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
    void testUpdateProductNotFound() {
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
    void testUpdateProductInvalidInput() {
        given()
                .contentType(ContentType.JSON)
                .body(invalidProductNegativePrice())
                .when()
                .put(BASE_URL + "/products/1")  // Assuming product with ID 1 exists
                .then()
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .body("price", equalTo("Price must be at least 0"));
    }

    @Test
    void testDeleteProduct() {
        Product saved = productRepository.save(prepareProduct());

        given()
                .contentType(ContentType.JSON)
                .when()
                .delete(BASE_URL + "/products/" + saved.getId())
                .then()
                .statusCode(HttpStatus.OK.value())
                .body("message", equalTo("Removed product by Id"));

        assertThat(productRepository.existsById(saved.getId())).isFalse();
    }

    @Test
    void shouldAddImageToProduct() {
        Product saved = productRepository.save(prepareProduct());

        ClassLoader classLoader = getClass().getClassLoader();
        File file = new File(Objects.requireNonNull(classLoader.getResource(TEST_IMAGE_NAME)).getFile());

        given()
                .contentType(ContentType.MULTIPART)
                .multiPart("file", file)
                .multiPart("fileName", TEST_IMAGE_NAME)
                .when()
                .post(BASE_URL + "/products/" + saved.getId() + "/image")
                .then()
                .statusCode(HttpStatus.OK.value())
                .body("message", containsString("File uploaded successfully to S3 with key: "))
                .body("message", containsString(TEST_IMAGE_NAME));

        Product productUpdated = productRepository.findByIdWithImageUrls(saved.getId())
                .orElseThrow();

        AssertThatProduct.actual(productUpdated)
                .isHavingImageUrl(TEST_IMAGE_NAME);
    }

    @Test
    void shouldRemoveImageFromProduct() {
        Product product = prepareProduct();
        product.setImageUrls(
                Set.of(ImageUrl.builder()
                        .product(product)
                        .url(TEST_IMAGE_NAME)
                        .build())
        );
        Product saved = productRepository.save(product);


        given()
                .contentType(ContentType.JSON)
                .param("imageUrl", TEST_IMAGE_NAME)
                .when()
                .delete(BASE_URL + "/products/" + saved.getId() + "/image")
                .then()
                .statusCode(HttpStatus.OK.value())
                .body("message", containsString("File deleted successfully from S3: "))
                .body("message", containsString(TEST_IMAGE_NAME));

        Product productUpdated = productRepository.findByIdWithImageUrls(saved.getId())
                .orElseThrow();

        AssertThatProduct.actual(productUpdated)
                .notHavingImageUrl(TEST_IMAGE_NAME);
    }

    @Test
    void shouldGetAllProducts() {
        productRepository.saveAll(prepareProducts());

        given()
                .contentType(ContentType.JSON)
                .when()
                .get(BASE_URL + "/products")
                .then()
                .statusCode(HttpStatus.OK.value())
                .body("[0].name", equalTo("product 1"))
                .body("[0].price", equalTo(150.0f))
                .body("[0].stockQuantity", equalTo(1))
                .body("[0].imageUrls[0]", equalTo(TEST_IMAGE_NAME))
                .body("[1].name", equalTo("product 2"))
                .body("[0].price", equalTo(150.0f))
                .body("[0].stockQuantity", equalTo(1))
                .body("[0].imageUrls[0]", equalTo(TEST_IMAGE_NAME))
                .body("[0].material", equalTo("Wood"))
                .body("[0].width", equalTo(50.0f))
                .body("[0].height", equalTo(40.0f))
                .body("[0].depth", equalTo(0.5f))
                .body("[0].description", equalTo("High quality wood product 1."))
                .body("[1].material", equalTo("Wood"))
                .body("[1].width", equalTo(50.0f))
                .body("[1].height", equalTo(40.0f))
                .body("[1].depth", equalTo(0.5f))
                .body("[1].description", equalTo("High quality wood product 2."));
    }

    @Test
    void shouldGetAllReviews() {
        productRepository.saveAll(prepareProducts());

        given()
                .contentType(ContentType.JSON)
                .when()
                .get(BASE_URL + "/reviews")
                .then()
                .statusCode(HttpStatus.OK.value())
                .body("[0].username", equalTo("Test-user"))
                .body("[0].comment", equalTo("someComment"))
                .body("[0].rating", equalTo(5))
                .body("[0].productName", equalTo("product 1"))
                .body("[0].imageUrl", equalTo(TEST_IMAGE_NAME))
                .body("[1].username", equalTo("Test-user"))
                .body("[1].comment", equalTo("someComment"))
                .body("[1].rating", equalTo(5))
                .body("[1].productName", equalTo("product 2"))
                .body("[1].imageUrl", equalTo(TEST_IMAGE_NAME));
    }

    @Test
    void shouldDeleteReviewById() {
        List<Product> entities = prepareProducts();
        Review review = entities.get(0).getReviews().iterator().next();
        productRepository.saveAll(entities);

        given()
                .contentType(ContentType.JSON)
                .when()
                .delete(BASE_URL + "/reviews/" + review.getId())
                .then()
                .statusCode(HttpStatus.OK.value())
                .body("message", containsString("Review deleted successfully"));

        Product product = productRepository.findByIdWithDetails(entities.get(0).getId()).orElseThrow();

        assertThat(product.getReviews()).doesNotContain(review);
    }
}