import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ibiblioteca } from 'src/app/models/ibiblioteca';
import { BibliotecaService } from 'src/app/services/biblioteca.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  biblioteca: Ibiblioteca;
  listBlogs:Ibiblioteca[]=[];

  titulo: string = "Detalle del Libro";
  fotoSeleccionada: File;
  progreso: number = 0;
 

  constructor(private bibliotecaService: BibliotecaService, private activatedRoute: ActivatedRoute ) { }

  ngOnInit() {

      const ids = [0, 1];
      ids.forEach((/* The index of the array. */ index)=> 
      {
        if (index) {
          this.bibliotecaService.getLibro(index).subscribe(biblioteca => {
            this.biblioteca = biblioteca;
          });
        }
      }
        
      )}
      // let id: number = +params.get('id');
      
  }


