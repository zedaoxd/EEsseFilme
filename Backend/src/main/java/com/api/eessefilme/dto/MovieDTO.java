package com.api.eessefilme.dto;

import com.api.eessefilme.entities.Comment;
import com.api.eessefilme.entities.Genre;
import com.api.eessefilme.entities.Movie;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MovieDTO implements Serializable {

    private Long id;

    private String originTitle;

    private String nationalTitle;

    private String image;

    private Date releaseDate;

    private String synopsis;

    private Integer parentalRating;

    private String mainActors;

    private Double averageRating;

    private String movieTrailer;

    private byte[] imageByte;

    private List<CommentDTO> comments = new ArrayList<>();

    @NotEmpty(message = "Can't be empty")
    private List<GenreDTO> genres = new ArrayList<>();

    public MovieDTO(Movie entity) {
        this.averageRating = entity.getAverageRating();
        this.movieTrailer = entity.getMovieTrailer();
        this.mainActors = entity.getMainActors();
        this.parentalRating = entity.getParentalRating();
        this.synopsis = entity.getSynopsis();
        this.releaseDate = entity.getReleaseDate();
        this.image = entity.getImage();
        this.nationalTitle = entity.getNationalTitle();
        this.originTitle = entity.getOriginTitle();
        this.id = entity.getId();
        this.genres.clear();
        //entity.getGenres().forEach(x -> this.genres.add(new GenreDTO(x)));
    }

    public MovieDTO(Movie entity, boolean genres) {
        this.averageRating = entity.getAverageRating();
        this.movieTrailer = entity.getMovieTrailer();
        this.mainActors = entity.getMainActors();
        this.parentalRating = entity.getParentalRating();
        this.synopsis = entity.getSynopsis();
        this.releaseDate = entity.getReleaseDate();
        this.image = entity.getImage();
        this.nationalTitle = entity.getNationalTitle();
        this.originTitle = entity.getOriginTitle();
        this.id = entity.getId();
        this.genres.clear();
        if (genres)
            entity.getGenres().forEach(x -> this.genres.add(new GenreDTO(x)));
    }

    public MovieDTO(Movie entity, List<Comment> comments) {
        this.averageRating = entity.getAverageRating();
        this.movieTrailer = entity.getMovieTrailer();
        this.mainActors = entity.getMainActors();
        this.parentalRating = entity.getParentalRating();
        this.synopsis = entity.getSynopsis();
        this.releaseDate = entity.getReleaseDate();
        this.image = entity.getImage();
        this.nationalTitle = entity.getNationalTitle();
        this.originTitle = entity.getOriginTitle();
        this.id = entity.getId();
        this.genres.clear();
        entity.getGenres().forEach(x -> this.genres.add(new GenreDTO(x)));

        this.comments.clear();
        comments.forEach(x -> this.comments.add(new CommentDTO(x)));
    }
}
