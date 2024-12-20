package com.topolski.backend.service;

import com.topolski.backend.exception.ProductNotFoundException;
import com.topolski.backend.exception.ReviewNotFoundException;
import com.topolski.backend.model.dto.review.ReviewDTO;
import com.topolski.backend.model.dto.review.ReviewRequest;
import com.topolski.backend.model.dto.review.ReviewWithProductNameDTO;
import com.topolski.backend.model.entity.Product;
import com.topolski.backend.model.entity.Review;
import com.topolski.backend.repository.ProductRepository;
import com.topolski.backend.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;

    public ReviewWithProductNameDTO addReview(ReviewRequest reviewRequest) {

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
        return review.toDTO();
    }

    public List<ReviewWithProductNameDTO> getAllReviews() {
        return reviewRepository.fetchAllReviewsWithProductName()
                .stream()
                .map(Review::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteReviewById(Long id) {
        if (!reviewRepository.existsById(id)) {
            throw new ReviewNotFoundException();
        }
        reviewRepository.deleteById(id);

        log.info("Deleted review of id {}", id);
    }

    @Transactional
    public void addReviewImageUrl(Long id, String name) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(ReviewNotFoundException::new);

        review.setImageUrl(name);

        reviewRepository.save(review);
    }
}
