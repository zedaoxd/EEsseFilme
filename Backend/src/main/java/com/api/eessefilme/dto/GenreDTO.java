package com.api.eessefilme.dto;

import com.api.eessefilme.entities.Genre;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class GenreDTO implements Serializable {

    private Long id;
    private String name;

    public GenreDTO(Genre genre) {
        this(genre.getId(), genre.getName());
    }
}
