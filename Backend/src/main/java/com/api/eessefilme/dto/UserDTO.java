package com.api.eessefilme.dto;

import com.api.eessefilme.entities.Comment;
import com.api.eessefilme.entities.Rating;
import com.api.eessefilme.entities.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

import java.util.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class UserDTO {

    private Long id;

    @NotBlank(message = "can't be blank")
    private String firstName;

    @NotBlank(message = "can't be blank")
    private String lastName;

    @NotBlank(message = "can't be blank")
    private String email;

    @NotEmpty(message = "can't be empty")
    private Set<RoleDTO> roles = new HashSet<>();
    
    private List<CommentDTO> comments = new ArrayList<>();

    private Set<RatingDTO> ratings = new HashSet<>();

    public UserDTO(User entity) {
        this.id = entity.getId();
        this.firstName = entity.getFirstName();
        this.lastName = entity.getLastName();
        this.email = entity.getEmail();
        entity.getRoles().forEach(role -> this.roles.add(new RoleDTO(role)));
    }
    
    public UserDTO(User entity, List<Comment> comments) {
        this.id = entity.getId();
        this.firstName = entity.getFirstName();
        this.lastName = entity.getLastName();
        this.email = entity.getEmail();
        entity.getRoles().forEach(role -> this.roles.add(new RoleDTO(role)));
        comments.forEach(comment -> this.comments.add(new CommentDTO(comment)));
    }

    public UserDTO(User entity, Collection<Rating> ratings) {
        this.id = entity.getId();
        this.firstName = entity.getFirstName();
        this.lastName = entity.getLastName();
        this.email = entity.getEmail();
        entity.getRoles().forEach(role -> this.roles.add(new RoleDTO(role)));
        ratings.forEach(r -> this.ratings.add(new RatingDTO(r)));
    }

    public UserDTO(User entity, List<Rating> ratings, List<Comment> comments) {
        this.id = entity.getId();
        this.firstName = entity.getFirstName();
        this.lastName = entity.getLastName();
        this.email = entity.getEmail();
        entity.getRoles().forEach(role -> this.roles.add(new RoleDTO(role)));
        ratings.forEach(r -> this.ratings.add(new RatingDTO(r)));
        comments.forEach(comment -> this.comments.add(new CommentDTO(comment)));
    }
}
