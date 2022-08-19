import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, tap,throwError } from 'rxjs';
import { Ibiblioteca } from '../models/ibiblioteca';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class BibliotecaService {

  private url: string = 'http://localhost:8080/api/libros';
  numLibros:number;
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) { }


  getLibros(page: number): Observable<any> {
    return this.http.get(this.url + '/page/' + page).pipe(
      map((response: any) => {
        this.numLibros = response.totalElements;
        (response.content as Ibiblioteca[]).map(cliente => {
          cliente.titulo = cliente.titulo.toUpperCase();
          return cliente;
        });
        return response;
      }),
    ) ;
  }

  create(libro: Ibiblioteca): Observable<any> {
    return this.http.post<any>(this.url, libro, { headers: this.httpHeaders }).pipe(
      map((response: any ) => response.libro as Ibiblioteca),
      catchError(e => {
        if(e.status == 400){
          return throwError(()=>e);
        }

        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        // Swal.fire('Error al crear', e.error.mensaje, 'error');

        return throwError(() => e);
      })
    );
  }

  getLibro(id): Observable<Ibiblioteca> {
    return this.http.get<Ibiblioteca>(`${this.url}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.log(this.router.url);
        console.error(e.error.mensaje);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(() => e);
      })
    );
  }


  update(libros: Ibiblioteca): Observable<any> {
    return this.http.put<any>(`${this.url}/${libros.id}`, libros, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        if(e.status == 400){
          return throwError(()=>e);
        }
        console.error(e.error.mensaje);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(() => e);
      })
    );
  }

  updateVenta(id: number): Observable<any> {
    return this.http.put<any>(`${this.url}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        if(e.status == 400){
          return throwError(()=>e);
        }
        console.error(e.error.mensaje);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(() => e);
      })
    );
  }

  delete(id: number): Observable<Ibiblioteca> {
    return this.http.delete<Ibiblioteca>(`${this.url}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire('Error al eliminar', e.error.mensaje, 'error');
        return throwError(() => e);
      })
    );
  }

  subirFoto(archivo: File, id): Observable<HttpEvent<{}>> {

    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    const req = new HttpRequest('POST', `${this.url}/upload`, formData, {
      reportProgress: true
    });
    return this.http.request(req);
  }

}
