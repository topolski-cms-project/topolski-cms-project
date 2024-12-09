package com.topolski.backend.controller;

import com.topolski.backend.model.product.dto.ReviewRequest;
import com.topolski.backend.service.ReviewService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping
    public ResponseEntity<String> createReview(@Valid @RequestBody ReviewRequest reviewRequest) {
        reviewService.addReview(reviewRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body("Review created successfully.");
    }
}
