package com.topolski.backend.model.dto.product;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.topolski.backend.model.entity.TechnicalDetails;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Builder;

@Builder
@JsonIgnoreProperties(ignoreUnknown = true)
public record ProductRequest(
        @NotBlank(message = "Product name cannot be blank")
        String name,

        @NotNull(message = "Price is required")
        @Min(value = 0, message = "Price must be at least 0")
        Double price,
        String description,
        String material,
        Double width,
        Double height,
        Double depth,
        @PositiveOrZero(message = "Quantity must be positive number or zero")
        Integer quantity
) {

    @JsonIgnore
    public TechnicalDetails getTechnicalDetails() {
        return new TechnicalDetails(
                this.material,
                this.width,
                this.height,
                this.depth,
                this.description
        );
    }
}