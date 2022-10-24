package com.basiclibrary.controlapi.controllers;

import com.basiclibrary.controlapi.model.Author;
import com.basiclibrary.controlapi.services.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/author")
public class AuthorController {

    @Autowired
    private AuthorService service;

    @GetMapping
    public List<Author> findAll() {
        return service.findAll();
    }
}
