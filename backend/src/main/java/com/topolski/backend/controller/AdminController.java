package com.topolski.backend.controller;

import com.topolski.backend.model.dto.product.ProductDTO;
import com.topolski.backend.model.dto.product.ProductRequest;
import com.topolski.backend.model.dto.review.ReviewWithProductNameDTO;
import com.topolski.backend.model.http.ServerResponse;
import com.topolski.backend.s3.S3Service;
import com.topolski.backend.service.ProductService;
import com.topolski.backend.service.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.util.Strings;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/private/admin")
@RequiredArgsConstructor
public class AdminController {

    private final ProductService productService;
    private final ReviewService reviewService;
    private final S3Service s3Service;

    @GetMapping("/products")
    public List<ProductDTO> getAllProducts() {
        return productService.getAllProductsWithTechnicalDetails();
    }

    @PostMapping("/products")
    public ResponseEntity<ProductDTO> addProduct(@Valid @RequestBody ProductRequest productRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.addProduct(productRequest));
    }

    @PutMapping("/products/{id}")
    public ResponseEntity<?> updateProduct(
            @PathVariable Long id,
            @RequestBody @Valid ProductRequest productRequest) {
        if (id == null) return ResponseEntity.badRequest().body(new ServerResponse("Id cannot be null"));

        ProductDTO updatedProduct = productService.updateProduct(id, productRequest);
        return ResponseEntity.ok(updatedProduct);
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<ServerResponse> removeProduct(@PathVariable Long id) {
        if (id == null) return ResponseEntity.badRequest().body(new ServerResponse("Id cannot be null"));

        productService.removeProduct(id);
        return ResponseEntity.status(HttpStatus.OK).body(new ServerResponse("Removed product by Id"));
    }

    @PostMapping("/products/{id}/image")
    public ResponseEntity<ServerResponse> uploadFile(@PathVariable Long id,
                                                     @RequestParam("file") MultipartFile file) throws IOException {
        if (id == null || file == null)
            return ResponseEntity.badRequest().body(new ServerResponse("Id or imageUrl file are not correctly configured"));

        MultipartFile renamedMultiPartFile = new MockMultipartFile(
                file.getName(),
                UUID.randomUUID() + "-" + file.getOriginalFilename(),
                file.getContentType(),
                file.getInputStream()
        );
        productService.addProductImageUrl(id, renamedMultiPartFile.getOriginalFilename());
        return ResponseEntity.ok().body(new ServerResponse(s3Service.putObject(renamedMultiPartFile)));
    }

    @DeleteMapping("/products/{id}/image")
    public ResponseEntity<ServerResponse> deleteFile(@PathVariable Long id, @RequestParam("imageUrl") String imageUrl) {
        if (id == null || Strings.isBlank(imageUrl))
            return ResponseEntity.badRequest().body(new ServerResponse("Id or imageUrl file are not correctly configured"));

        productService.removeProductImageUrl(id, imageUrl);
        return ResponseEntity.ok().body(new ServerResponse(s3Service.deleteObject(imageUrl)));
    }

    @GetMapping("/reviews")
    public List<ReviewWithProductNameDTO> getAllReviews() {
        return reviewService.getAllReviews();
    }

    @DeleteMapping("/reviews/{id}")
    public ResponseEntity<ServerResponse> deleteReview(@PathVariable Long id) {
        if (id == null) return ResponseEntity.badRequest().body(new ServerResponse("Id cannot be null"));

        reviewService.deleteReviewById(id);
        return ResponseEntity.ok(new ServerResponse("Review deleted successfully"));
    }
}
