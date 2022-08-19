import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Ibiblioteca } from '../models/ibiblioteca';
import { BibliotecaService } from '../services/biblioteca.service';

@Component({
  selector: 'app-home-detalle',
  templateUrl: './home-detalle.component.html',
  styleUrls: ['./home-detalle.component.scss']
})
export class HomeDetalleComponent implements OnInit {
  biblioteca: Ibiblioteca;
  libro: Ibiblioteca = new Ibiblioteca();
  errores: string[];

  constructor(private bibliotecaService: BibliotecaService, private activatedRoute: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let id: number = +params.get('id');
      if (id) {
        this.bibliotecaService.getLibro(id).subscribe(biblioteca => {
          this.biblioteca = biblioteca;
        });
      }
    });
    this.cargarLibros();
  }
  cargarLibros(): void{
    this.activatedRoute.params.subscribe(
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

  comprar(){
    Swal.fire({
      title: 'Desea comprar este libro?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Comprar',
      denyButtonText: `No, volver`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Comprado!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('No se ha podido completar la compra.', '', 'info')
      }
    })
  }


  update():void{
    this.bibliotecaService.updateVenta(this.biblioteca.id).subscribe(
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
