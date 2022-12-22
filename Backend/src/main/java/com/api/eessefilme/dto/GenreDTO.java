package com.api.eessefilme.dto;

import com.api.eessefilme.entities.Genre;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class GenreDTO implements Serializable {

	@EqualsAndHashCode.Include
    private Long id;

    @NotBlank(message = "can't be blank")
    private String name;

    public GenreDTO(Genre genre) {
        this(genre.getId(), genre.getName());
    }
}
