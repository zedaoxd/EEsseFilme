package com.api.eessefilme.dto;

import java.io.Serializable;

import com.api.eessefilme.entities.Role;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class RoleDTO implements Serializable{

	@EqualsAndHashCode.Include
	private Long id;

	@NotBlank(message = "can't be blank")
	private String name;
	
	public RoleDTO(Role role) {
		this(role.getId(), role.getName());
	}
}
