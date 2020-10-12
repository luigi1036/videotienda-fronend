import { Injectable } from '@angular/core';
import {  Observable,throwError } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { from} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router} from '@angular/router';
import { Prestamo } from './prestamo';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {

private urlEndpoint:string = 'http://localhost:8080/prestamo/listarPrestamo';
private urlEndpointcrear:string = 'http://localhost:8080/prestamo/crearPrestamo';
private urlEndpointGet:string = 'http://localhost:8080/prestamo/prestamo';
private urlEndpointUpdate:string = 'http://localhost:8080/prestamo/prestamoUpdate';

private httHeader = new HttpHeaders({'content-type':'application/json'})

  constructor(private http: HttpClient, private router: Router) { }

  getPrestamos(): Observable<Prestamo[]>{ 
    return this.http.get<Prestamo[]>(this.urlEndpoint)
  }

  create(prestamo :Prestamo) : Observable<Prestamo> {
    return this.http.post(this.urlEndpointcrear, prestamo, {headers: this.httHeader}).pipe(
      map((response: any) =>response.prestamo as Prestamo ),
      catchError(e => {
        if(e.status==400){
          return throwError(e);
        }
        swal('Error al Crear el Prestamo', e.error.mensaje, 'error');
        return throwError(e);
  
      })
    );
  }
  
  getPrestamo(id) :Observable<any>{
    return this.http.get<any>(`${this.urlEndpointGet}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/prestamos']);
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
  
      })
    );
  }
  
  update(prestamo: Prestamo) :Observable<any>{
    return this.http.put<any>(`${this.urlEndpointUpdate}/${prestamo.id}`, prestamo, {headers :this.httHeader}).pipe(
      catchError(e => {
        if(e.status==400){
          return throwError(e);
        }
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
  
      })
    );
  }
  

}
