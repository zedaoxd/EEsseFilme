package com.api.eessefilme.repositories;

import com.api.eessefilme.entities.Genre;
import com.api.eessefilme.entities.Movie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {

    @Query(value = "SELECT DISTINCT m FROM Movie m " +
            "INNER JOIN m.genres g " +
            // need coalesce COALESCE(:categories, NULL) to work on postgres but with it
            // gives error on h2
            "WHERE (:genres IS NULL OR g IN :genres) " +
            "AND (UPPER(m.nationalTitle) LIKE UPPER(CONCAT('%', :nationalTitle, '%')))")
    Page<Movie> find(@Param("genres") List<Genre> genres, @Param("nationalTitle") String nationalTitle,
            Pageable pageable);

    @Query(value = "SELECT DISTINCT m FROM Movie m " +
            "INNER JOIN m.genres g " +
            // need coalesce COALESCE(:categories, NULL) to work on postgres but with it
            // gives error on h2
            "WHERE (:genres IS NULL OR g IN :genres) " +
            "AND (UPPER(m.nationalTitle) LIKE UPPER(CONCAT('%', :title, '%')) OR UPPER(m.originTitle) LIKE UPPER(CONCAT('%', :title, '%'))) " +
            "AND (:releaseDate IS NULL OR m.releaseDate >= :releaseDate) ")
    Page<Movie> find(@Param("genres") List<Genre> genres, @Param("title") String title,
            @Param("releaseDate") Date releaseDate, Pageable pageable);

    List<Movie> findFirst10ByOrderByAverageRatingDesc();

    @Query(nativeQuery = true, value = "select tb_m.* from tb_movie tb_m inner join (select id from (select m1.id, count(r.rating) from tb_movie m1 left join tb_rating r on r.movie_id = m1.id group by m1.id order by count(r.rating) desc limit 10) x) tb_m_r on tb_m.id = tb_m_r.id")
    List<Movie> findTop10PlusAverageRating();

    @Query(value = "SELECT mov FROM Movie mov JOIN FETCH mov.genres WHERE mov IN :movies")
    List<Movie> findMovieWithCategories(@Param("movies") List<Movie> movies);

    List<Movie> findFirst10ByOrderByReleaseDateDesc();
}
