import { Component, OnInit } from '@angular/core';
import {Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent  {

  
  clientes: Cliente[];

  constructor(private clienteService : ClienteService) { }

  ngOnInit(){
    this.clienteService.getClientes().subscribe(
      clientes => this.clientes = clientes
    )
  }

  delete(cliente :Cliente): void{
     swal({
      title: 'Estas Seguro?',
      text: `Esta seguro de eliminar al cliente ${cliente.primerNombre} ${cliente.primerApellido}?`,
      type: "warning",
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.clienteService.delete(cliente.id).subscribe(
          response =>{
            this.clientes = this.clientes.filter(cli=> cli !==cliente)
            swal(
              'Cliente eliminado!',
              `Cliente ${cliente.primerApellido} eliminado con exito`,
              'success'
            )
          }
        );
       
      } 
    })
  }
  
}
