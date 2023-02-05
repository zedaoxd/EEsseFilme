package com.api.eessefilme.services;

import java.awt.desktop.SystemEventListener;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import com.api.eessefilme.entities.Movie;
import com.api.eessefilme.repositories.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.api.eessefilme.dto.CommentDTO;
import com.api.eessefilme.entities.Comment;
import com.api.eessefilme.entities.User;
import com.api.eessefilme.repositories.CommentRepository;
import com.api.eessefilme.repositories.UserRepository;
import com.api.eessefilme.services.exceptions.DatabaseException;
import com.api.eessefilme.services.exceptions.ResourceNotFoundException;

@Service
public class CommentService {

	@Autowired
	private CommentRepository repository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private AuthService authService;

	@Autowired
	private MovieRepository movieRepository;
	
	@Transactional(readOnly = true)
	public Page<CommentDTO> paged(Pageable pageable){
		return repository.findAll(pageable).map(x -> new CommentDTO(x));
	}
	
	@Transactional(readOnly = true)
	public CommentDTO findById(Long id){
		Optional<Comment> optional = repository.findById(id);
		Comment entity = optional.orElseThrow(() -> new ResourceNotFoundException("Resource not found"));
		return new CommentDTO(entity);
	}
	
	@Transactional(readOnly = true)
	public Page<CommentDTO> findCommentsByUser(Pageable pageable, Long userId){
		User entity = userRepository.getReferenceById(userId);
		return repository.findByUser(entity, pageable).map(x -> new  CommentDTO(x));
	}

	@Transactional(readOnly = true)
	public Page<CommentDTO> findCommentsByMovie(Pageable pageable, Long movieId){
		return repository.findByMovieId(movieId, pageable).map(CommentDTO::new);
	}
	
	@Transactional
	public CommentDTO save(CommentDTO dto){
		Comment entity = new Comment();
		entity.setDescription(dto.getDescription());
		entity.setUser(authService.authenticated());
		entity.setMovie(movieRepository.getReferenceById(dto.getMovie().getId()));
		return new CommentDTO(repository.save(entity));
	}
	
	@Transactional
	public CommentDTO update(CommentDTO dto, Long id) {
		try {
			Comment entity = repository.getReferenceById(id);
			entity.setDescription(dto.getDescription());
			entity.setSpoiler(dto.isSpoiler());
			return new CommentDTO(repository.save(entity));
		} catch(EntityNotFoundException e) {
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

    public List<CommentDTO> findCommentsByUserByMovie(Long movieId, Long userId) {
		return repository.findCommentsByUserIdAndMovieId(userId, movieId).stream().map(x -> new CommentDTO(x)).toList();
    }
}
