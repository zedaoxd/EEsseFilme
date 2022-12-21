package com.api.eessefilme.services;

import com.api.eessefilme.dto.RoleDTO;
import com.api.eessefilme.entities.Role;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.api.eessefilme.repositories.RoleRepository;
import com.api.eessefilme.services.exceptions.DatabaseException;
import com.api.eessefilme.services.exceptions.ResourceNotFoundException;

@Service
public class RoleService {

	@Autowired
	private RoleRepository repository;
	
	@Transactional(readOnly = true)
	public List<RoleDTO> findAll(){
		return repository.findAll(Sort.by("name"))
				.stream().map(x -> new RoleDTO(x))
				.collect(Collectors.toList());
	}
	
	@Transactional(readOnly = true)
	public RoleDTO findById(Long id) {
		Optional<Role> optional = repository.findById(id);
		Role entity = optional.orElseThrow(() -> new ResourceNotFoundException("Resource not found"));
		return new RoleDTO(entity);
	}
	
	@Transactional
	public RoleDTO save(RoleDTO dto) {
		Role entity = new Role();
		entity.setName(dto.getName());
		entity = repository.save(entity);
		return new RoleDTO(entity);
	}
	
	@Transactional
	public RoleDTO update(RoleDTO dto, Long id) {
		try {
			Role entity = repository.getReferenceById(id);
			entity.setName(dto.getName());
			entity = repository.save(entity);
			return new RoleDTO(entity);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("ID not found:" + id);
		}
	}
	
	public void delete(Long id) {
		try {
			repository.deleteById(id);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("ID not found:" + id);
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Integrity violation");
		}
	}
}
