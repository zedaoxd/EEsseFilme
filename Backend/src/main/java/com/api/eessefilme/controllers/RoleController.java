package com.api.eessefilme.controllers;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.api.eessefilme.dto.RoleDTO;
import com.api.eessefilme.services.RoleService;

import javax.validation.Valid;

@RestController
@RequestMapping(value = "/api/roles")
public class RoleController {

	@Autowired
	private RoleService service;
	
	@GetMapping
	public ResponseEntity<List<RoleDTO>> fildAll(){
		return ResponseEntity.ok(service.findAll());
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<RoleDTO> findById(@PathVariable("id") Long id){
		return ResponseEntity.ok(service.findById(id));
	}

	@PostMapping
	public ResponseEntity<RoleDTO> save(@RequestBody @Valid RoleDTO dto){
		dto = service.save(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(dto.getId()).toUri();
        return ResponseEntity.created(uri).body(dto);
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<RoleDTO> update(@RequestBody @Valid RoleDTO dto, @PathVariable("id") Long id){
		return ResponseEntity.ok(service.update(dto, id));
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> delete(@PathVariable("id") Long id){
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
}
