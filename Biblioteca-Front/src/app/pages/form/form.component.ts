import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Ibiblioteca } from '../../models/ibiblioteca';
import { BibliotecaService } from '../../services/biblioteca.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {


  libro: Ibiblioteca = new Ibiblioteca();
  
  titulos: string= "Crear Libro";
  errores: string[];
  constructor(private bibliotecaService: BibliotecaService, private router: Router, private activateRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarLibros();
  }

  cargarLibros(): void{
    this.activateRouter.params.subscribe(
      params => {
        let id = params['id']
        if(id){
          this.bibliotecaService.getLibro(id).subscribe(
            (libro) => this.libro = libro
          )
        }
      }
    )
    }

    
  public create():void{
    this.bibliotecaService.create(this.libro).subscribe(
      libro =>{
        console.log(libro);
        this.router.navigate(['/libros'])
        Swal.fire('Nuevo Libro', `El libro  ${libro.titulo} ha sido creado con exito`,  'success')
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend ', err.status);
        
        console.error('Libro no creado', err.error.errors);
      }
    )
  }

  update():void{
    this.bibliotecaService.update(this.libro).subscribe(
      json => {
        // console.log(json.biblioteca.titulo);
        this.router.navigate(['/libros'])
        Swal.fire('Libro Actualizado', `${json.mensaje}:   ${json.biblioteca.titulo}`, 'success')
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend ', err.status);
        
        console.error('Libro no creado', err.error.errors);
      }
    )
  }
}
