import { Injectable } from '@angular/core';
import {  Observable,throwError } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { from} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router} from '@angular/router';
import{ Producto} from './producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

private urlEndpoint:string = 'http://localhost:8080/videojuego/listarvideosjuegos';
private urlEndpointcrear:string = 'http://localhost:8080/videojuego/crearVideojuego';
private urlEndpointGet:string = 'http://localhost:8080/videojuego/videoJuego';
private urlEndpointUpdate:string = 'http://localhost:8080/videojuego/videoJuegoUpdate';

private httHeader = new HttpHeaders({'content-type':'application/json'})

  constructor(private http: HttpClient, private router: Router) { }

  getProductos():Observable<Producto[]>{
    return this.http.get<Producto[]>(this.urlEndpoint);
  }

  getProducto(id) :Observable<any>{
    return this.http.get<any>(`${this.urlEndpointGet}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/productos']);
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
  
      })
    );
  }

  create(producto :Producto) : Observable<Producto> {
    return this.http.post(this.urlEndpointcrear, producto, {headers: this.httHeader}).pipe(
      map((response: any) =>response.cliente as Producto ),
      catchError(e => {
        if(e.status==400){
          return throwError(e);
        }
        swal('Error al Crear el Producto', e.error.mensaje, 'error');
        return throwError(e);
  
      })
    );
  }

  update(producto: Producto) :Observable<any>{
    return this.http.put<any>(`${this.urlEndpointUpdate}/${producto.id}`, producto, {headers :this.httHeader}).pipe(
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
