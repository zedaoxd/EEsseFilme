package com.api.eessefilme.services;

import com.api.eessefilme.dto.MovieDTO;
import com.api.eessefilme.entities.Comment;
import com.api.eessefilme.entities.Genre;
import com.api.eessefilme.entities.Movie;
import com.api.eessefilme.repositories.CommentRepository;
import com.api.eessefilme.repositories.GenreRepository;
import com.api.eessefilme.repositories.MovieRepository;
import com.api.eessefilme.services.exceptions.DatabaseException;
import com.api.eessefilme.services.exceptions.ResourceNotFoundException;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Optional;
import java.util.UUID;

@Service
public class MovieService {

    @Autowired
    private MovieRepository repository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private GenreRepository genreRepository;

    private final String PATH_IMAGE = "./src/main/resources/images/";

    @Transactional(readOnly = true)
    public Page<MovieDTO> findAll(Pageable pageable){
        var page = repository.findAll(pageable).map(x -> new MovieDTO(x));
        for(MovieDTO m: page){
            m.setImageByte(getImageByte(m.getImage()));
        }
        return page;
    }

    @Transactional(readOnly = true)
    public MovieDTO findById(Long id) {
        Optional<Movie> optional = repository.findById(id);
        Movie entity = optional.orElseThrow(() -> new ResourceNotFoundException("Resource not found"));
        MovieDTO dto = new MovieDTO(entity);
        dto.setImageByte(getImageByte(entity.getImage()));
        return dto;
    }

    @Transactional
    public MovieDTO save(MovieDTO dto) {
        Movie entity = new Movie();
        copyDtoToEntity(dto, entity);
        entity = repository.save(entity);
        return new MovieDTO(entity);
    }

    @Transactional
    public MovieDTO update(MovieDTO dto, Long id) {
        try {
            Movie entity = repository.getReferenceById(id);
            copyDtoToEntity(dto, entity);
            entity = repository.save(entity);
            return new MovieDTO(entity);
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

    public String saveImage(MultipartFile file)  {
        try {
            if (!file.isEmpty()) {
                byte[] bytes = file.getBytes();
                String nameImage = UUID.randomUUID() + file.getOriginalFilename();
                String path = PATH_IMAGE + nameImage;
                Files.write(Path.of(path), bytes);
                return nameImage;
            }
        } catch (IOException e) {
            throw new ResourceNotFoundException("Invalid File");
        }
        return null;
    }

    public byte[] getImageByte(String nameImage) {
        try {
            InputStream in = new FileInputStream(PATH_IMAGE + nameImage);
            return IOUtils.toByteArray(in);
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private void copyDtoToEntity(MovieDTO dto, Movie entity) {
        entity.setImage(dto.getImage());
        entity.setMovieTrailer(dto.getMovieTrailer());
        entity.setMainActors(dto.getMainActors());
        entity.setSynopsis(dto.getSynopsis());
        entity.setOriginTitle(dto.getOriginTitle());
        entity.setNationalTitle(dto.getNationalTitle());
        entity.setParentalRating(dto.getParentalRating());
        entity.setReleaseDate(dto.getReleaseDate());

        entity.getComments().clear();
        dto.getComments().forEach(x -> {
            Comment comment = commentRepository.getReferenceById(x.getId());
            entity.getComments().add(comment);
        });

        entity.getGenres().clear();
        dto.getGenres().forEach(x -> {
            Genre genre = genreRepository.getReferenceById(x.getId());
            entity.getGenres().add(genre);
        });
    }
}
