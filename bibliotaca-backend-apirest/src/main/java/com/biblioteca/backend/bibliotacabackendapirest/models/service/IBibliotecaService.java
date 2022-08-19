package com.biblioteca.backend.bibliotacabackendapirest.models.service;

import com.biblioteca.backend.bibliotacabackendapirest.models.entity.Biblioteca;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IBibliotecaService {

    public List<Biblioteca> findAll();

    public Page<Biblioteca> findAll(Pageable pageable);

    public Biblioteca findById(Long id);

    public Biblioteca save(Biblioteca biblioteca);

    public void delete(Long id);

}
