package com.topolski.backend.service;

import com.topolski.backend.exception.ProductNotFoundException;
import com.topolski.backend.model.product.dto.ReviewRequest;
import com.topolski.backend.model.product.entity.Product;
import com.topolski.backend.model.product.entity.Review;
import com.topolski.backend.repository.ProductRepository;
import com.topolski.backend.repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;

    public ReviewService(ReviewRepository reviewRepository, ProductRepository productRepository) {
        this.reviewRepository = reviewRepository;
        this.productRepository = productRepository;
    }

    public void addReview(ReviewRequest reviewRequest) {

        Product product = productRepository.findById(reviewRequest.getProductId())
                .orElseThrow(ProductNotFoundException::new);

        Review review = Review.builder()
                .product(product)
                .rating(reviewRequest.getRating())
                .comment(reviewRequest.getReviewText())
                .username(reviewRequest.getReviewerName())
                .createdAt(LocalDateTime.now())
                .build();

        reviewRepository.save(review);
    }
}
