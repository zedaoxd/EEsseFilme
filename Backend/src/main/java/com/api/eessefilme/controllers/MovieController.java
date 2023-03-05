package com.api.eessefilme.controllers;

import com.api.eessefilme.dto.MovieDTO;
import com.api.eessefilme.services.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.io.IOException;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(value = "/api/movies")
public class MovieController {

    @Autowired
    private MovieService service;

    @GetMapping
    public ResponseEntity<Page<MovieDTO>> findAll(
            Pageable pageable,
            @RequestParam(value = "genreId", defaultValue = "0") Long genreId,
            @RequestParam(value = "originalTitle", defaultValue = "") String originalTitle,
            @RequestParam(value = "releaseDate", defaultValue = "0") Long releaseDate) {

        return ResponseEntity.ok(service.findAll(pageable, genreId, originalTitle, releaseDate));
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<MovieDTO> findById(@PathVariable("id") Long id) {
        MovieDTO dto = service.findById(id);
        return ResponseEntity.ok(dto);
    }

    @GetMapping(value = "/top10rating")
    public ResponseEntity<List<MovieDTO>> findTop10Rating() {
        return ResponseEntity.ok(service.findTop10Rating());
    }

    @GetMapping(value = "/top10date")
    public ResponseEntity<List<MovieDTO>> findTop10Date() {
        return ResponseEntity.ok(service.findTop10Date());
    }

    @PostMapping
    public ResponseEntity<MovieDTO> save(@RequestBody @Valid MovieDTO dto) {
        dto = service.save(dto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(dto.getId()).toUri();
        return ResponseEntity.created(uri).body(dto);
    }

    @PostMapping(value = "/image")
    public ResponseEntity<String> saveImage(@RequestParam("file") MultipartFile file)  {
        return ResponseEntity.ok(service.saveImage(file));
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<MovieDTO> update(@RequestBody @Valid MovieDTO dto, @PathVariable("id") Long id) {
        dto = service.update(dto, id);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
