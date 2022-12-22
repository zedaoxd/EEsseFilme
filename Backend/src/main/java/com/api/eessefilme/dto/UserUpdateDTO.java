package com.api.eessefilme.dto;

import com.api.eessefilme.services.validations.UserUpdateValid;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@UserUpdateValid
public class UserUpdateDTO extends UserDTO {
}
