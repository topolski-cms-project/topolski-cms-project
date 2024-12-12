package com.topolski.backend.model.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Builder
public class ImageUrl implements Comparable<ImageUrl> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String url;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Override
    public int compareTo(ImageUrl o) {
        if (this.url == null || o.url == null) {
            throw new IllegalArgumentException();
        }
        return getComparableIndex(this.url).compareTo(getComparableIndex(o.url));
    }

    private Integer getComparableIndex(String value) {
        return value.indexOf(".jpg") - 1;
    }
}
