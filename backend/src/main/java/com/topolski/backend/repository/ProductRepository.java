package com.topolski.backend.repository;

import com.topolski.backend.model.product.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("""
            SELECT DISTINCT p FROM Product p
            LEFT JOIN FETCH p.technicalDetails
            LEFT JOIN FETCH p.imageUrls
            LEFT JOIN FETCH p.reviews
            """)
    List<Product> findAllWithDetails();

    @Query("SELECT p FROM Product p LEFT JOIN FETCH p.imageUrls WHERE p.id = :id")
    Optional<Product> findByIdWithImages(@Param("id") Long id);

}