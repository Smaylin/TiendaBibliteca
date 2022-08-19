import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BibliotecaService } from '../../services/biblioteca.service';
import { Ibiblioteca } from '../../models/ibiblioteca';
import { tap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-libros',
  templateUrl: './detalle-libros.component.html',
  styleUrls: ['./detalle-libros.component.scss']
})
export class DetalleLibrosComponent implements OnInit {

  libros: Ibiblioteca[];
  paginador: any;
  libroSeleccionado:Ibiblioteca;

  constructor(private bibliotecaService:BibliotecaService ,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');

      if (!page) {
        page = 0;
      }

      this.bibliotecaService.getLibros(page)
        .pipe(
          tap(response => {
            // console.log('ClientesComponent: tap 3');
            // (response.content as Ibiblioteca[]).forEach(libro => console.log(libro.titulo));
          })
        ).subscribe(response => {
          this.libros = response.content as Ibiblioteca[];
          this.paginador = response;
        });
    });
  }
  delete(libro: Ibiblioteca): void {
    Swal.fire({
      title: 'Está seguro?',
      text: `Seguro que desea eliminar el cliente ${libro.titulo} ${libro.genero}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si,Eliminar '
    }).then((result) => {
      if (result.value) {
        this.bibliotecaService.delete(libro.id).subscribe(
          response => {
            this.libros = this.libros.filter(cli => cli !== libro);
            Swal.fire(
              'Cliente Eliminado',
              `Cliente ${libro.titulo} Eliminado con exito`,
              'success'
            )
          }
        )

      }
    })
  }
}
