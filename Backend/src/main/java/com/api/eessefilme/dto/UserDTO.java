package com.api.eessefilme.dto;

import com.api.eessefilme.entities.Role;
import com.api.eessefilme.entities.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.util.HashSet;
import java.util.Set;

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

    public UserDTO(User entity) {
        this.id = entity.getId();
        this.firstName = entity.getFirstName();
        this.lastName = entity.getLastName();
        this.email = entity.getEmail();
        entity.getRoles().forEach(role -> this.roles.add(new RoleDTO(role)));
    }
}
