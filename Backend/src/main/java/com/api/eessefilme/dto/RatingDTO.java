package com.api.eessefilme.dto;

import com.api.eessefilme.entities.Rating;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.FutureOrPresent;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;
import java.io.Serializable;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RatingDTO implements Serializable {

    private Long id;

    @PositiveOrZero(message = "rating can't be less than zero")
    private Double rating;

    @FutureOrPresent(message = "rating doesn't be past")
    private Date dateRating;

    private UserDTO user;

    @NotNull(message = "cannot be null")
    private MovieDTO movie;

    public RatingDTO(Rating entity) {
        this.id = entity.getId();
        this.rating = entity.getRating();
        this.movie = new MovieDTO(entity.getMovie());
        this.dateRating = entity.getDateRating();
        this.user = new UserDTO(entity.getUser());
    }
}
