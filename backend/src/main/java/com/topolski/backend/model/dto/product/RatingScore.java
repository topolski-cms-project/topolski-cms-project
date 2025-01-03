package com.topolski.backend.model.dto.product;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonValue;
import com.topolski.backend.model.entity.Review;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;

import java.util.Set;

@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class RatingScore {

    @JsonValue
    @JsonAlias("ratingScore")
    private final Double value;

    public static RatingScore from(Set<Review> reviews) {
        return new RatingScore(reviews.stream()
                .mapToInt(Review::getRating)
                .average()
                .orElse(0.0));
    }
}
