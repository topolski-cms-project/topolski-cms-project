package com.topolski.backend.repository;

import com.topolski.backend.model.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query("SELECT r FROM Review r " +
            "JOIN FETCH r.product")
    Set<Review> fetchAllReviewsWithProductName();
}
