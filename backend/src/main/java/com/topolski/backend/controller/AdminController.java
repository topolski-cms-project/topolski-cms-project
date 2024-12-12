package com.topolski.backend.controller;

import com.topolski.backend.model.dto.product.ProductDTO;
import com.topolski.backend.model.dto.product.ProductRequest;
import com.topolski.backend.model.dto.review.ReviewWithProductNameDTO;
import com.topolski.backend.model.http.ServerResponse;
import com.topolski.backend.service.ProductService;
import com.topolski.backend.service.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/private/admin")
@RequiredArgsConstructor
public class AdminController {

    private final ProductService productService;
    private final ReviewService reviewService;

    @GetMapping("/products")
    public List<ProductDTO> getAllProducts() {
        return productService.getAllProductsWithTechnicalDetails();
    }

    @PostMapping("/products")
    public ResponseEntity<ServerResponse> addProduct(@Valid @RequestBody ProductRequest productRequest) {
        productService.addProduct(productRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ServerResponse("Product added successfully"));
    }

    @PutMapping("/products/{id}")
    public ResponseEntity<ProductDTO> updateProduct(
            @PathVariable Long id,
            @RequestBody @Valid ProductRequest productRequest) {
        ProductDTO updatedProduct = productService.updateProduct(id, productRequest);
        return ResponseEntity.ok(updatedProduct);
    }

    @GetMapping("/reviews")
    public List<ReviewWithProductNameDTO> getAllReviews() {
        return reviewService.getAllReviews();
    }

    @DeleteMapping("/reviews/{id}")
    public ResponseEntity<ServerResponse> deleteReview(@PathVariable Long id) {
        reviewService.deleteReviewById(id);
        return ResponseEntity.ok(new ServerResponse("Review deleted successfully"));
    }
}
