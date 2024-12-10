package com.topolski.backend.model.product.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@JsonIgnoreProperties(ignoreUnknown = true)
public class ReviewRequest {

    @NotNull(message = "Product ID cannot be null.")
    private Long productId;

    @NotBlank(message = "Review text cannot be blank.")
    @Size(max = 500, message = "Review text must not exceed 500 characters.")
    private String reviewText;

    @NotNull(message = "Rating cannot be null.")
    @Min(value = 1, message = "Rating must be at least 1.")
    @Max(value = 5, message = "Rating must not exceed 5.")
    private Integer rating;

    @NotBlank(message = "Reviewer name cannot be blank.")
    @Size(max = 100, message = "Reviewer name must not exceed 100 characters.")
    private String reviewerName;
}
