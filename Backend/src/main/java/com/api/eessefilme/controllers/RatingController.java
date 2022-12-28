package com.api.eessefilme.controllers;

import com.api.eessefilme.dto.RatingDTO;
import com.api.eessefilme.services.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(value = "/api/ratings")
public class RatingController {

    @Autowired
    private RatingService service;

    @GetMapping
    public ResponseEntity<Page<RatingDTO>> findAll(Pageable pageable) {
        return ResponseEntity.ok(service.paged(pageable));
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<RatingDTO> findById(@PathVariable("id") Long id) {
        RatingDTO dto = service.findById(id);
        return ResponseEntity.ok(dto);
    }

    @PostMapping
    public ResponseEntity<RatingDTO> save(@RequestBody @Valid RatingDTO dto) {
        dto = service.save(dto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(dto.getId()).toUri();
        return ResponseEntity.created(uri).body(dto);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<RatingDTO> update(@RequestBody @Valid RatingDTO dto, @PathVariable("id") Long id) {
        dto = service.update(dto, id);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
