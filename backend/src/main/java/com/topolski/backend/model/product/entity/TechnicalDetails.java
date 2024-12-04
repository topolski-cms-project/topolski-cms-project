package com.topolski.backend.model.product.entity;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Embeddable
public class TechnicalDetails {

    private String material;

    private Double width;

    private Double height;

    private String description;
}
