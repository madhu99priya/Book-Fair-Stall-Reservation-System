package com.bookfair.backend.service;

import com.bookfair.backend.domain.Genre;
import com.bookfair.backend.dto.genre.GenreCreateRequest;
import com.bookfair.backend.exception.BusinessRuleViolationException;
import com.bookfair.backend.exception.ResourceNotFoundException;
import com.bookfair.backend.repository.GenreRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GenreService {

    private final GenreRepository genreRepository;

    public GenreService(GenreRepository genreRepository) {
        this.genreRepository = genreRepository;
    }

    public List<Genre> list() {
        return genreRepository.findAll();
    }

    public Genre create(GenreCreateRequest req) {
        if (genreRepository.existsByName(req.getName())) {
            throw new BusinessRuleViolationException("Genre already exists");
        }
        Genre g = Genre.builder().name(req.getName().trim()).build();
        return genreRepository.save(g);
    }

    public void delete(Long id) {
        Genre g = genreRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Genre not found"));
        genreRepository.delete(g);
    }
}