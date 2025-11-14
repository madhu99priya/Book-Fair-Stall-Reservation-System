package com.bookfair.backend.service;

import com.bookfair.backend.model.Genre;
import com.bookfair.backend.repository.GenreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GenreService {
    private final GenreRepository genreRepository;

    // Add new genre
    public Genre createGenre(Genre genre){
        if(genreRepository.findByName(genre.getName()).isPresent()){
            throw new RuntimeException("This genre already exists");
        }
        return genreRepository.save(genre);
    }

    // get genre by ID
    public Genre getGenreById(Long id){
        return genreRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Genre with id "+ id +" not found"));
    }

    // delete genre
    public void deleteGenre(Long id){
        Genre genre = getGenreById(id);
        genreRepository.delete(genre);
    }
    
}
