package com.topolski.backend.model.product.dto.review;

import com.topolski.backend.model.product.entity.Review;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class ReviewDTO {
    private final String username;
    private final String comment;
    private final String imageUrl;
    private final Integer rating;

    public static ReviewDTO from(Review review) {
        return new ReviewDTO(review.getUsername(), review.getComment(), "Not yet implemented", review.getRating());
    }
}
