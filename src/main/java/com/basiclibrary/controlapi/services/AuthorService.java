package com.basiclibrary.controlapi.services;

import com.basiclibrary.controlapi.model.Author;
import com.basiclibrary.controlapi.repositories.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.logging.Logger;

@Service
public class AuthorService {

    @Autowired
    private AuthorRepository repository;

    private final Logger logger = Logger.getLogger(AuthorService.class.getName());

    public List<Author> findAll(){
        logger.info("Find All Authors");
        return repository.findAll();
    }

    public Author create(Author author) {
        logger.info("Create Author");
        return repository.save(author);
    }

    public Author update(Author author){
        logger.info("Update Author");
        return author;
    }

    public void delete(UUID id) {
        logger.info("Delete Author");
        repository.deleteById(id);
    }
}
