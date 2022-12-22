package com.api.eessefilme.controllers;

import com.api.eessefilme.dto.GenreDTO;
import com.api.eessefilme.services.GenreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(value = "/api/genre")
public class GenreController {

    @Autowired
    private GenreService service;

    @GetMapping
    public ResponseEntity<List<GenreDTO>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping(value = "/{id}") // /api/genre/id
    public ResponseEntity<GenreDTO> findById(@PathVariable("id") Long id) {
        GenreDTO dto = service.findById(id);
        return ResponseEntity.ok(dto); // {id: ??, name: ??}
    }

    @PostMapping
    public ResponseEntity<GenreDTO> save(@RequestBody @Valid GenreDTO dto) { // {name: ??}
        dto = service.save(dto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(dto.getId()).toUri();
        return ResponseEntity.created(uri).body(dto);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<GenreDTO> update(@RequestBody @Valid GenreDTO dto, @PathVariable("id") Long id) {
        dto = service.update(dto, id);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
