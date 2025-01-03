package com.topolski.backend.model.entity;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class TechnicalDetails {

    private String material;

    private Double width;

    private Double height;

    private Double depth;

    private String description;
}
