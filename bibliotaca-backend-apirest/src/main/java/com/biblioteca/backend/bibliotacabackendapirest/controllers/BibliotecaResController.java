package com.biblioteca.backend.bibliotacabackendapirest.controllers;

import com.biblioteca.backend.bibliotacabackendapirest.models.dao.IBibliotecaDao;
import com.biblioteca.backend.bibliotacabackendapirest.models.entity.Biblioteca;
import com.biblioteca.backend.bibliotacabackendapirest.models.service.IBibliotecaService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class BibliotecaResController {


    @Autowired
    private IBibliotecaService bibliotecaService;





    private final Logger log = LoggerFactory.getLogger(BibliotecaResController.class);

    @GetMapping("/libros")
    public List<Biblioteca> index() {
        return bibliotecaService.findAll();
    }

    @GetMapping("/libros/{id}")
    public ResponseEntity<?> show(@PathVariable Long id) {
        Biblioteca biblioteca = null;
        Map<String, Object> response = new HashMap<>();

        try {
            biblioteca = bibliotecaService.findById(id);
        } catch (DataAccessException e) {
            response.put("mensaje", "Error al realizar la consulta en la base de datos");
            response.put("mensaje", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (biblioteca == null) {
            response.put("mensaje", "El libro ID: ".concat(id.toString().concat(" no existe en la base de datos!")));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Biblioteca>(biblioteca, HttpStatus.OK);
    }


    @PostMapping("/libros")
    public ResponseEntity<?> create(@Valid @RequestBody Biblioteca biblioteca, BindingResult result) {
        biblioteca.setFecha(new Date());
        Biblioteca bibliotecaNew = null;
        Map<String, Object> response = new HashMap<>();
        if(result.hasErrors()){
            List<String> errors = result.getFieldErrors().stream()
                    .map(error -> "El campo '" + error.getField() + "' " + error.getDefaultMessage())
                    .collect(Collectors.toList());
            response.put("errors", errors);
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
        }
        try {
            bibliotecaNew = bibliotecaService.save(biblioteca);
        } catch (DataAccessException e) {
            response.put("mensaje", "Error al realizar el insert en la base de datos");
            response.put("mensaje", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<Biblioteca>(bibliotecaNew, HttpStatus.CREATED);
    }


    @PutMapping("/libros/{id}")
    public ResponseEntity<?> update(@Valid @RequestBody Biblioteca biblioteca,BindingResult result, @PathVariable Long id){

        Biblioteca bibliotecaActual = bibliotecaService.findById(id);
        bibliotecaActual.setRentado(biblioteca.getRentado());
        Biblioteca bibliotecaUpdated = null;
        Map<String, Object> response = new HashMap<>();

        if(result.hasErrors()){
            List<String> errors = result.getFieldErrors().stream()
                    .map(error -> "El campo '" + error.getField() + "' " + error.getDefaultMessage())
                    .collect(Collectors.toList());
            response.put("errors", errors);
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
        }

        if(bibliotecaActual == null){
            response.put("mensaje", "Error: no se puede editar, el libro ID: ".concat(id.toString().concat(" no existe en la base de datos!")));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
        }

        try{
            bibliotecaActual.setTitulo(biblioteca.getTitulo());
            bibliotecaActual.setAutor(biblioteca.getAutor());
            bibliotecaActual.setEditorial(biblioteca.getEditorial());
            bibliotecaActual.setFecha(biblioteca.getFecha());
            bibliotecaActual.setDescripcion(biblioteca.getDescripcion());
            bibliotecaActual.setPrecio(biblioteca.getPrecio());
            bibliotecaUpdated = bibliotecaService.save(bibliotecaActual);

        }catch (DataAccessException e){
            response.put("mensaje", "Error al actualizar en la base de datos");
            response.put("mensaje", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        response.put("mensaje", "El libro ha sido actualizado con éxito!");
        response.put("biblioteca", bibliotecaUpdated);
        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);

    }

    @DeleteMapping("/libros/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        try {
            Biblioteca biblioteca = bibliotecaService.findById(id);
            bibliotecaService.delete(id);
        } catch (DataAccessException e) {
            response.put("mensaje", "Error al eliminar en la base de datos");
            response.put("mensaje", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        response.put("mensaje", "El libro ha sido eliminado con éxito!");
        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
    }


    @PostMapping("/libros/upload")
    public ResponseEntity<?>upload(@RequestParam("archivo") MultipartFile archivo, @RequestParam("id") Long id){
        Map<String, Object> response = new HashMap<>();
        Biblioteca biblioteca = bibliotecaService.findById(id);
        if(!archivo.isEmpty()) {
            String nombreArchivo = UUID.randomUUID().toString() + "_" + archivo.getOriginalFilename().replace(" ", "");
            Path rutaArchivo = Paths.get("uploads").resolve(nombreArchivo).toAbsolutePath();
            log.info(rutaArchivo.toString());
            try {
                Files.copy(archivo.getInputStream(), rutaArchivo);
            } catch (IOException e) {
                response.put("mensaje", "Error al subir la imagen del libro" + nombreArchivo);
                response.put("error", e.getMessage().concat(": ").concat(e.getCause().getMessage()));
                return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
            }
            String nombreFotoAnterior = biblioteca.getFoto();
            if(nombreFotoAnterior != null && nombreFotoAnterior.length() > 0){
                Path rutaFotoAnterior = Paths.get("uploads").resolve(nombreFotoAnterior).toAbsolutePath();
                File archivoFotoAnterior = rutaFotoAnterior.toFile();
                if(archivoFotoAnterior.exists() && archivoFotoAnterior.canRead()){
                    archivoFotoAnterior.delete();
                }
            }
            biblioteca.setFoto(nombreArchivo);
            bibliotecaService.save(biblioteca);
            response.put("cliente", biblioteca);
            response.put("mensaje", "El archivo ha sido cargado con éxito!" + nombreArchivo);
        }
        return new ResponseEntity<Map<String,Object>>(response, HttpStatus.CREATED);
    }


    @GetMapping("/uploads/img/{nombreFoto:.+}")
    public ResponseEntity<Resource> verFoto(@PathVariable String nombreFoto){
        Path rutaArchivo = Paths.get("uploads").resolve(nombreFoto).toAbsolutePath();
        log.info(rutaArchivo.toString());
        Resource recurso = null;
        try {
            recurso = new UrlResource(rutaArchivo.toUri());
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
        if(!recurso.exists() || !recurso.isReadable()){
            throw new RuntimeException("Error: no se pudo cargar la imagen: " + nombreFoto);
        }
        HttpHeaders cabecera = new HttpHeaders();
        cabecera.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + recurso.getFilename() + "\"");

        return new ResponseEntity<Resource>(recurso, cabecera, HttpStatus.OK);
    }


    //Metodo para la paginacion de los clientes
    @GetMapping("/libros/page/{page}")
    public Page<Biblioteca> index(@PathVariable Integer page) {
        Pageable pageable= PageRequest.of(page, 5);
        return  bibliotecaService.findAll(pageable);
    }

}
//    Page<Biblioteca> pageBiblioteca = bibliotecaService.findAll(PageRequest.of(page, size, Sort.by(order).ascending()));
//        return new ResponseEntity<Page<Biblioteca>>(pageBiblioteca, HttpStatus.OK);