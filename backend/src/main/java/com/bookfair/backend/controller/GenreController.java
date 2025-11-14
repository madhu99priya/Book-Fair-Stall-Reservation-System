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

    // delete genre
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteGenre(@PathVariable Long id){
        genreService.deleteGenre(id);
        return ResponseEntity.noContent().build();
    }
}
