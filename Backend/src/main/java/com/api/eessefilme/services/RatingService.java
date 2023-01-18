package com.api.eessefilme.services;

import com.api.eessefilme.dto.MovieDTO;
import com.api.eessefilme.dto.RatingDTO;
import com.api.eessefilme.entities.Movie;
import com.api.eessefilme.entities.Rating;
import com.api.eessefilme.entities.User;
import com.api.eessefilme.repositories.MovieRepository;
import com.api.eessefilme.repositories.RatingRepository;
import com.api.eessefilme.repositories.UserRepository;
import com.api.eessefilme.services.exceptions.DatabaseException;
import com.api.eessefilme.services.exceptions.ResourceNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class RatingService {

	private static final Logger logger = LoggerFactory.getLogger(RatingService.class);

	@Autowired
	private RatingRepository repository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private AuthService authService;
	@Autowired
	private MovieRepository movieRepository;
	@Autowired
	private MovieService movieService;
	
	@Transactional(readOnly = true)
	public Page<RatingDTO> paged(Pageable pageable){
		return repository.findAll(pageable).map(x -> new RatingDTO(x));
	}
	
	@Transactional(readOnly = true)
	public RatingDTO findById(Long id){
		Optional<Rating> optional = repository.findById(id);
		Rating entity = optional.orElseThrow(() -> new ResourceNotFoundException("Resource not found"));
		return new RatingDTO(entity);
	}
	
	@Transactional(readOnly = true)
	public Page<RatingDTO> findRatingsByUser(Pageable pageable, Long userId){
		User entity = userRepository.getReferenceById(userId);
		return repository.findByUserId(entity.getId(), pageable).map(x -> new  RatingDTO(x));
	}
	
	@Transactional
	public RatingDTO save(RatingDTO dto){
		Rating entity = new Rating();
		copyDtoToEntity(dto, entity);

		if(repository.existsByMovieIdAndUserId(entity.getMovie().getId(), entity.getUser().getId())) {
			throw new DatabaseException("User does't insert other rating to this movie");
		}

		entity = repository.save(entity);
		Long idMovie = dto.getMovie().getId();
		movieService.updateAverageRating(idMovie);
		return new RatingDTO(entity);
	}
	
	@Transactional
	public RatingDTO update(RatingDTO dto, Long id) {
		try {
			Rating entity = repository.getReferenceById(id);
			copyDtoToEntity(dto, entity);
			entity = repository.save(entity);

			Long idMovie = dto.getMovie().getId();
			movieService.updateAverageRating(idMovie);
			return new RatingDTO(entity);
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

	private void copyDtoToEntity(RatingDTO dto, Rating entity){
		entity.setRating(dto.getRating());
		entity.setUser(authService.authenticated());
		entity.setMovie(movieRepository.getReferenceById(dto.getMovie().getId()));
	}
}
