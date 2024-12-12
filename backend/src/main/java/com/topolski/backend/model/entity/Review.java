package com.topolski.backend.model.entity;

import com.topolski.backend.model.dto.review.ReviewWithProductNameDTO;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "reviews")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    private String username;
    private String comment;
    private Integer rating;
    @Column(name = "image_url")
    private String imageUrl;

    private LocalDateTime createdAt;

    public ReviewWithProductNameDTO toDTO() {
        return new ReviewWithProductNameDTO(id, username, comment, rating, product.getName(), imageUrl);
    }
}
