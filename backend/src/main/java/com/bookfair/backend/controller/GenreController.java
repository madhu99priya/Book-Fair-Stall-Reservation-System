package com.bookfair.backend.controller;

import com.bookfair.backend.model.Genre;
import com.bookfair.backend.service.GenreService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("api/genres")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class GenreController {
    private final GenreService genreService;

    // create genre
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Genre> createGenre(@RequestBody Genre genre){
        return ResponseEntity.ok(genreService.createGenre(genre));
    }

    // get genre by id
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'EXHIBITOR')")
    public ResponseEntity<Genre> getGenreById(@PathVariable Long id) {
        return ResponseEntity.ok(genreService.getGenreById(id));
    }

    // delete genre
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteGenre(@PathVariable Long id){
        genreService.deleteGenre(id);
        return ResponseEntity.noContent().build();
    }
}
