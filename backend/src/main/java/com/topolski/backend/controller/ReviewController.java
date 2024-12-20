package com.topolski.backend.controller;

import com.topolski.backend.model.dto.review.ReviewRequest;
import com.topolski.backend.model.dto.review.ReviewWithProductNameDTO;
import com.topolski.backend.model.http.ServerResponse;
import com.topolski.backend.service.ReviewService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/reviews")

public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping
    public ResponseEntity<ReviewWithProductNameDTO> createReview(@Valid @RequestBody ReviewRequest reviewRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(reviewService.addReview(reviewRequest));
    }
}
