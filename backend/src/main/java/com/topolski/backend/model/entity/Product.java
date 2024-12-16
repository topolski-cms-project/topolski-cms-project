package com.topolski.backend.model.entity;

import com.topolski.backend.model.dto.product.ProductDTO;
import com.topolski.backend.model.dto.product.RatingScore;
import com.topolski.backend.model.dto.review.ReviewDTO;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.proxy.HibernateProxy;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Builder
@NoArgsConstructor
@Getter
@Setter
@Table(name = "products")
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false)
    private BigDecimal price;

    private Integer stockQuantity;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ImageUrl> imageUrls = new HashSet<>();

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Review> reviews = new HashSet<>();

    @Embedded
    private TechnicalDetails technicalDetails;

    public ProductDTO toDTO() {
        return ProductDTO.builder()
                .id(id)
                .name(name)
                .price(price)
                .stockQuantity(stockQuantity)
                .imageUrls(extractUrls())
                .ratingScore(RatingScore.from(reviews))
                .build();
    }

    public ProductDTO toDetailedDTO() {
        return ProductDTO.builder()
                .id(id)
                .name(name)
                .price(price)
                .stockQuantity(stockQuantity)
                .imageUrls(extractUrls())
                .reviews(getReviewDTO())
                .technicalDetails(technicalDetails)
                .ratingScore(RatingScore.from(reviews))
                .build();
    }

    public ProductDTO toTechnicalDetailsDTO() {
        return ProductDTO.builder()
                .id(id)
                .name(name)
                .price(price)
                .stockQuantity(stockQuantity)
                .technicalDetails(technicalDetails)
                .imageUrls(extractUrls())
                .build();
    }

    public void updateStockQuantity(Integer quantity) {
        this.stockQuantity += Optional.ofNullable(quantity).orElse(0);
    }

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        Product product = (Product) o;
        return id != null && Objects.equals(id, product.id);
    }

    @Override
    public final int hashCode() {
        return this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass().hashCode() : getClass().hashCode();
    }

    private List<String> extractUrls() {
        return Optional.ofNullable(this.imageUrls)
                .orElse(Set.of())
                .stream()
                .map(ImageUrl::getUrl)
                .collect(Collectors.toList());
    }

    private List<ReviewDTO> getReviewDTO() {
        return Optional.ofNullable(this.reviews)
                .orElse(Set.of())
                .stream()
                .map(ReviewDTO::from)
                .collect(Collectors.toList());
    }

    public void addImageUrl(ImageUrl imageUrl) {
        this.imageUrls.add(imageUrl);
    }

    public void removeImageUrl(String name) {
        this.imageUrls.stream()
                .filter(imageUrl -> imageUrl.getUrl().equals(name))
                .findFirst()
                .ifPresent(this::removeImageUrl);
    }

    private void removeImageUrl(ImageUrl imageUrl) {
        imageUrl.setProduct(null);
        imageUrls.remove(imageUrl);
    }
}
