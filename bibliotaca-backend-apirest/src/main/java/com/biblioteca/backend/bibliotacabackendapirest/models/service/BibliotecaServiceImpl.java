package com.biblioteca.backend.bibliotacabackendapirest.models.service;

import com.biblioteca.backend.bibliotacabackendapirest.models.dao.IBibliotecaDao;
import com.biblioteca.backend.bibliotacabackendapirest.models.entity.Biblioteca;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BibliotecaServiceImpl  implements IBibliotecaService{

    @Autowired
    private IBibliotecaDao bibliotecaDao;

    @Override
    @Transactional(readOnly = true)
    public List<Biblioteca> findAll() { return (List<Biblioteca>) bibliotecaDao.findAll(); }

    @Override
    @Transactional(readOnly = true)
    public Page<Biblioteca> findAll(Pageable pageable) {
        return bibliotecaDao.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Biblioteca findById(Long id) {
        return bibliotecaDao.findById(id).orElse(null);
    }

    @Override
    @Transactional
    public Biblioteca save(Biblioteca biblioteca) {
        return bibliotecaDao.save(biblioteca);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        bibliotecaDao.deleteById(id);
    }

}
