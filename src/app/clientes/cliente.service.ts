import { Injectable } from '@angular/core';
import {Cliente } from './cliente';
import {  Observable,throwError } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { from} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router} from '@angular/router';

@Injectable()
export class ClienteService {
private urlEndpoint:string = 'http://localhost:8080/clientes/listarClientes';
private urlEndpointcrear:string = 'http://localhost:8080/clientes/crearCliente';
private urlEndpointGet:string = 'http://localhost:8080/clientes/cliente';
private urlEndpointUpdate:string = 'http://localhost:8080/clientes/clienteUpdate';

private httHeader = new HttpHeaders({'content-type':'application/json'})

constructor(private http: HttpClient, private router: Router) { }

getClientes(): Observable<Cliente[]>{ 
  return this.http.get<Cliente[]>(this.urlEndpoint)

}
create(cliente :Cliente) : Observable<Cliente> {
  return this.http.post(this.urlEndpointcrear, cliente, {headers: this.httHeader}).pipe(
    map((response: any) =>response.cliente as Cliente ),
    catchError(e => {
      console.log(e.status);
      if(e.status==400){
        return throwError(e);
      }
      swal('Error al Crear el usuario', e.error.mensaje, 'error');
      return throwError(e);

    })
  );
}

getCliente(id) :Observable<any>{
  return this.http.get<any>(`${this.urlEndpointGet}/${id}`).pipe(
    catchError(e => {
      this.router.navigate(['/clientes']);
      swal(e.error.mensaje, e.error.error, 'error');
      return throwError(e);

    })
  );
}

update(cliente: Cliente) :Observable<any>{
  return this.http.put<any>(`${this.urlEndpointUpdate}/${cliente.id}`, cliente, {headers :this.httHeader}).pipe(
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