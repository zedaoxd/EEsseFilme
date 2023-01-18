package com.api.eessefilme.dto;

import com.api.eessefilme.services.validations.UserUpdateValid;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@UserUpdateValid
public class UserUpdateDTO extends UserDTO {

    @Size(min = 8, max = 16, message = "the length must be between 8 and 16 characters")
    private String password;

    public UserUpdateDTO(Long id, String firstName, String lastName, String email, Set<RoleDTO> roles, String password) {
        super(id, firstName, lastName, email, roles, new ArrayList<>(), new HashSet<>());
        this.password = password;
    }
}
