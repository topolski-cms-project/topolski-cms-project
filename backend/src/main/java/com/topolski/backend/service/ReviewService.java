package com.topolski.backend.service;

import com.topolski.backend.exception.ProductNotFoundException;
import com.topolski.backend.exception.ReviewNotFoundException;
import com.topolski.backend.model.dto.review.ReviewRequest;
import com.topolski.backend.model.dto.review.ReviewWithProductNameDTO;
import com.topolski.backend.model.entity.Product;
import com.topolski.backend.model.entity.Review;
import com.topolski.backend.repository.ProductRepository;
import com.topolski.backend.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;

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

    public List<ReviewWithProductNameDTO> getAllReviews() {
        return reviewRepository.fetchAllReviewsWithProductName();
    }

    @Transactional
    public void deleteReviewById(Long id) {
        if (!reviewRepository.existsById(id)) {
            throw new ReviewNotFoundException();
        }
        reviewRepository.deleteById(id);
    }
}
