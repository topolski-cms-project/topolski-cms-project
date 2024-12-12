package com.topolski.backend.repository;

import com.topolski.backend.model.dto.review.ReviewWithProductNameDTO;
import com.topolski.backend.model.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query("SELECT new com.topolski.backend.model.dto.review.ReviewWithProductNameDTO(r.id, r.username, r.comment, r.rating, p.name) " +
            "FROM Review r JOIN r.product p")
    List<ReviewWithProductNameDTO> fetchAllReviewsWithProductName();
}
