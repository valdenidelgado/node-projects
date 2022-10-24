package com.basiclibrary.controlapi.controllers;

import com.basiclibrary.controlapi.model.Papers;
import com.basiclibrary.controlapi.services.PapersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/papers")
public class PapersController {

    @Autowired
    private PapersService service;

    public List<Papers> findAll() {
        return service.findAll();
    }
}
