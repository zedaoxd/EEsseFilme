package com.api.eessefilme.services;

import com.api.eessefilme.dto.GenreDTO;
import com.api.eessefilme.entities.Genre;
import com.api.eessefilme.repositories.GenreRepository;
import com.api.eessefilme.services.exceptions.DatabaseException;
import com.api.eessefilme.services.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class GenreService {

    @Autowired
    private GenreRepository repository;

    @Transactional(readOnly = true)
    public List<GenreDTO> findAll() {
        return repository.findAll(Sort.by("name")).stream().map(x -> new GenreDTO(x)).collect(Collectors.toList());
    }


    @Transactional(readOnly = true)
    public GenreDTO findById(Long id) {
        Optional<Genre> optional = repository.findById(id);
        Genre entity = optional.orElseThrow(() -> new ResourceNotFoundException("Resource not found"));
        return new GenreDTO(entity);
    }

    @Transactional
    public GenreDTO save(GenreDTO dto) {
        Genre entity = new Genre();
        entity.setName(dto.getName());
        entity = repository.save(entity);
        return new GenreDTO(entity);
    }

    @Transactional
    public GenreDTO update(GenreDTO dto, Long id) {
        try {
            Genre entity = repository.getReferenceById(id);
            entity.setName(dto.getName());
            entity = repository.save(entity);
            return new GenreDTO(entity);
        } catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("ID not found: " + id);
        }
    }

    public void delete(Long id) {
        try {
            repository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            throw new ResourceNotFoundException("ID not found: " + id);
        } catch (DataIntegrityViolationException e) {
            throw new DatabaseException("Integrity violation");
        }
    }
}
