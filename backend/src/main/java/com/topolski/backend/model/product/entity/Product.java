package com.topolski.backend.model.product.entity;

import com.topolski.backend.model.product.dto.ProductDTO;
import com.topolski.backend.model.product.dto.ProductDetailsDTO;
import com.topolski.backend.model.product.dto.RatingScore;
import com.topolski.backend.model.product.dto.ReviewDTO;
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
        return new ProductDTO(id, name, price, stockQuantity, extractUrls(), RatingScore.from(reviews));
    }

    public ProductDetailsDTO toDetailedDTO() {
        return new ProductDetailsDTO(id, name, price, stockQuantity, extractUrls(), technicalDetails, getReviewDTO());
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
        return this.imageUrls.stream()
                .map(ImageUrl::getUrl)
                .collect(Collectors.toList());
    }

    private List<ReviewDTO> getReviewDTO() {
        return this.reviews
                .stream()
                .map(ReviewDTO::from)
                .collect(Collectors.toList());
    }
}
