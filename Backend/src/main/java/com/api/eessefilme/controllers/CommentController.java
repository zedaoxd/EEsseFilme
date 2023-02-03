package com.api.eessefilme.controllers;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
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

import com.api.eessefilme.dto.CommentDTO;
import com.api.eessefilme.services.CommentService;

@RestController
@RequestMapping(value = "/api/comments")
public class CommentController {

	@Autowired
	private CommentService service;
	
	@GetMapping
    public ResponseEntity<Page<CommentDTO>> pagedComment(Pageable pageable) {
        return ResponseEntity.ok(service.paged(pageable));
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<CommentDTO> findById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(service.findById(id));
    }
    
    @GetMapping(value = "/user/{userId}")
    public ResponseEntity<Page<CommentDTO>> findByUserId(Pageable pageable, @PathVariable("userId") Long userId){
    	return ResponseEntity.ok(service.findCommentsByUser(pageable, userId));
    }

    @GetMapping(value = "/movie/{movieId}")
    public ResponseEntity<Page<CommentDTO>> findByMovieId(
            @PageableDefault(sort = "dateComment", direction = Sort.Direction.DESC) Pageable pageable,
            @PathVariable("movieId") Long movieId) {
        return ResponseEntity.ok(service.findCommentsByMovie(pageable, movieId));
    }

    @GetMapping(value = "/user/{userId}/movie/{movieId}")
    public ResponseEntity<List<CommentDTO>> findByUserIdMovieId(@PathVariable("userId") Long userId, @PathVariable("movieId") Long movieId){
        return ResponseEntity.ok(service.findCommentsByUserByMovie(movieId, userId));
    }

    @PostMapping
    public ResponseEntity<CommentDTO> save(@RequestBody @Valid CommentDTO dto) {
        dto = service.save(dto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(dto.getId()).toUri();
        return ResponseEntity.created(uri).body(dto);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<CommentDTO> update(@RequestBody @Valid CommentDTO dto, @PathVariable("id") Long id) {
        return ResponseEntity.ok(service.update(dto, id));
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
