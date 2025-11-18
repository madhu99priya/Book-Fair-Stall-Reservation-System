// Genre Service

package com.bookfair.backend.service;

import com.bookfair.backend.model.Genre;
import com.bookfair.backend.repository.GenreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

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

    // get all genres
    public List<Genre> getAllGenres(){
        return genreRepository.findAll();
    }

    // update genre
    public Genre updateGenre(Long id, Genre updatedGenre){
        Genre existing = getGenreById(id);

        // prevent duplicate names
        genreRepository.findByName(updatedGenre.getName())
                .filter(g -> !g.getId().equals(id))
                .ifPresent(g -> {
                    throw new RuntimeException("This genre name is already used");
                });

        existing.setName(updatedGenre.getName());

        return genreRepository.save(existing);
    }

    // delete genre
    public void deleteGenre(Long id){
        Genre genre = getGenreById(id);
        genreRepository.delete(genre);
    }

    @Transactional
    public Genre getOrCreateGenre(String name) {
        return genreRepository.findByName(name)
                .orElseGet(() -> createGenre(Genre.builder().name(name).build()));
    }

    
}
