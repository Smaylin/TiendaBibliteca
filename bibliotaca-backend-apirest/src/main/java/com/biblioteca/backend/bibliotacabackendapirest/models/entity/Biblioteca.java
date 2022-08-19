package com.biblioteca.backend.bibliotacabackendapirest.models.entity;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "db_biblioteca")
public class Biblioteca implements Serializable {

    @Id
    @GeneratedValue(strategy = javax.persistence.GenerationType.IDENTITY)
    private Long id;
    @NotEmpty(message = "es requerido")
    @Size(min = 5, max = 30, message = "debe tener entre 5 y 30 caracteres")
    @Column(nullable = false )
    private String titulo;
    @NotEmpty(message = "es requerido")
    private String genero;
    @NotEmpty(message = "es requerido")
    private String descripcion;
    @NotEmpty(message = "es requerido")
    private String editorial;
    @NotEmpty(message = "es requerido")
    private String autor;
    @NotNull(message = "es requerido")
    @Temporal(TemporalType.DATE)
    private Date fecha;

    private Boolean rentado;

    private String foto;
    private int precio;



    public int getPrecio() {
        return precio;
    }

    public void setPrecio(int precio) {
        this.precio = precio;
    }


    public String getFoto() {
        return foto;
    }

    public void setFoto(String foto) {
        this.foto = foto;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String nombre) {
        this.titulo = nombre;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getEditorial() {
        return editorial;
    }

    public void setEditorial(String editorial) {
        this.editorial = editorial;
    }

    public String getAutor() {
        return autor;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public Boolean getRentado() {
        return rentado;
    }

    public void setRentado(Boolean rentado) {
        this.rentado = rentado;
    }

    private static final long serialVersionUID = 1L;
}
