package com.basiclibrary.controlapi.services;

import com.basiclibrary.controlapi.model.Papers;
import com.basiclibrary.controlapi.repositories.PapersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.logging.Logger;

@Service
public class PapersService {

    @Autowired
    private PapersRepository repository;

    private final Logger logger = Logger.getLogger(AuthorService.class.getName());

    public List<Papers> findAll() {
        logger.info("Find all papers");
        return repository.findAll();
    }

    public Papers create(Papers papers) {
        return repository.save(papers);
    }

    public Papers update(Papers papers) {
        return papers;
    }

    public void delete(UUID id) {
        repository.deleteById(id);
    }
}
