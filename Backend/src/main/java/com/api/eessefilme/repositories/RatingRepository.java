package com.api.eessefilme.repositories;

import com.api.eessefilme.entities.Rating;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {

    Page<Rating> findByUserId(Long id, Pageable pageable);

    Long countByMovieId(Long id);

    @Query(nativeQuery = true, value = "SELECT avg(rating) FROM TB_RATING WHERE movie_id = :id")
    Double updateAverage(Long id);

    boolean existsByMovieIdAndUserId(Long idMovie, Long idUser);
}
