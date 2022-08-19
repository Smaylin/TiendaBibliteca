package com.biblioteca.backend.bibliotacabackendapirest.models.dao;

import com.biblioteca.backend.bibliotacabackendapirest.models.entity.Biblioteca;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface IBibliotecaDao extends JpaRepository<Biblioteca, Long> {


}
