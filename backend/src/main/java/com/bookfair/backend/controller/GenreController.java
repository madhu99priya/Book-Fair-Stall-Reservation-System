package com.bookfair.backend.controller;

import com.bookfair.backend.domain.Genre;
import com.bookfair.backend.dto.genre.GenreCreateRequest;
import com.bookfair.backend.service.GenreService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/genres")
public class GenreController {

    private final GenreService genreService;

    public GenreController(GenreService genreService) {
        this.genreService = genreService;
    }

    @GetMapping
    public List<Genre> list() {
        return genreService.list();
    }

    @PostMapping
    public Genre create(@Valid @RequestBody GenreCreateRequest req) {
        return genreService.create(req);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        genreService.delete(id);
    }
}