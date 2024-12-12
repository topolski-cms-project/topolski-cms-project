package com.topolski.backend.model.product.dto.product;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonUnwrapped;
import com.topolski.backend.model.product.dto.review.ReviewDTO;
import com.topolski.backend.model.product.entity.TechnicalDetails;
import lombok.Builder;

import java.math.BigDecimal;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Builder
public record ProductDTO(
        Long id,
        String name,
        BigDecimal price,
        Integer stockQuantity,
        List<String> imageUrls,
        List<ReviewDTO> reviews,
        @JsonUnwrapped TechnicalDetails technicalDetails,
        RatingScore ratingScore) {
}