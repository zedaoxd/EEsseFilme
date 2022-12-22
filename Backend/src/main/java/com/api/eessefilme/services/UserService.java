package com.api.eessefilme.services;

import com.api.eessefilme.dto.UserDTO;
import com.api.eessefilme.dto.UserInsertDTO;
import com.api.eessefilme.dto.UserUpdateDTO;
import com.api.eessefilme.entities.Role;
import com.api.eessefilme.entities.User;
import com.api.eessefilme.repositories.RoleRepository;
import com.api.eessefilme.repositories.UserRepository;
import com.api.eessefilme.services.exceptions.DatabaseException;
import com.api.eessefilme.services.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private RoleRepository roleRepository;

    @Transactional(readOnly = true)
    public Page<UserDTO> paged(Pageable pageable) {
        return repository.findAll(pageable).map(x -> new UserDTO(x));
    }

    @Transactional(readOnly = true)
    public UserDTO findById(Long id) {
        Optional<User> optional = repository.findById(id);
        User entity = optional.orElseThrow(() -> new ResourceNotFoundException("Resource not found"));
        return new UserDTO(entity);
    }

    @Transactional
    public UserDTO save(UserInsertDTO insertDTO) {
        User entity = new User();
        convertDtoToEntity(insertDTO, entity);
        entity.setPassword(insertDTO.getPassword());
        return new UserDTO(repository.save(entity));
    }

    @Transactional
    public UserDTO update(UserUpdateDTO dto, Long id) {
        try {
            User entity = repository.getReferenceById(id);
            convertDtoToEntity(dto, entity);
            entity = repository.save(entity);
            return new UserDTO(entity);
        } catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("ID not found: " + id);
        }
    }

    public void delete(Long id) {
        try {
            repository.deleteById(id);
        } catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("ID not found: " + id);
        } catch (DataIntegrityViolationException e) {
            throw new DatabaseException("Integrity violation");
        }
    }

    private void convertDtoToEntity(UserDTO dto, User entity) {
        entity.setEmail(dto.getEmail());
        entity.setFirstName(dto.getFirstName());
        entity.setLastName(dto.getLastName());

        entity.getRoles().clear();
        dto.getRoles().forEach(roleDto -> {
            Role role = roleRepository.getReferenceById(roleDto.getId());
            entity.getRoles().add(role);
        });
    }
}
