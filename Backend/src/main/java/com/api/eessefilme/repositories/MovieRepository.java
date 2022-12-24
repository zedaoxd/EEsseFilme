package com.api.eessefilme.repositories;

import com.api.eessefilme.entities.Genre;
import com.api.eessefilme.entities.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {

    List<Movie> findTop10ByReleaseDateOrderByReleaseDateDesc(Date date);

}
