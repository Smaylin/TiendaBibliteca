import { tap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Ibiblioteca } from '../../models/ibiblioteca';
import { BibliotecaService } from '../../services/biblioteca.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  bibliotecas: Ibiblioteca[]=[] ;
  titulo: string = "Detalle del Libro";
  fotoSeleccionada: File;
  progreso: number = 0;

  constructor(private bibliotecaService: BibliotecaService, private activatedRoute: ActivatedRoute ) { }

  ngOnInit() {

    const numLibros = this.bibliotecaService.numLibros;
    if(numLibros === undefined) {
      this.bibliotecaService.getLibros(0).subscribe(()=> {
        this._cargarLibros(this.bibliotecaService.numLibros);
      }); 
    } else {
      this._cargarLibros(numLibros)
    }
  }

  private _cargarLibros(numLibros: number) {
    for(let i = 1; i < numLibros+1 ; i++) {
      this.bibliotecaService.getLibro(i).subscribe(biblioteca => {
          this.bibliotecas.push(biblioteca);
        });
    }
  }
}
  