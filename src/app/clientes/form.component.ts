import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal  from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  public titulo: string = 'Formulario de Clientes';
  private errores: String[];


  constructor(private clienteService : ClienteService, private router : Router,
    private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente();
  }

  cargarCliente(): void{
    this.activatedRouter.params.subscribe(params =>{
      let id = params['id']
      if(id){
        this.clienteService.getCliente(id).subscribe((cliente)=>this.cliente = cliente)
      }
    });
  }

  public create():void{
   this.clienteService.create(this.cliente).subscribe(cliente =>{
        this.router.navigate(['/clientes'])
        swal('Nuevo Cliente', `Cliente ${this.cliente.primerNombre} creado con exito`, "success"  ) 
     },
     err => {
      console.log(err.error.errors);
      this.errores = err.error.errors as String[];
     });
  }

  update():void{
    this.clienteService.update(this.cliente).subscribe(
      response =>{
        console.log(response)
        this.router.navigate(['/clientes'])
        swal('Se Actualizo el Cliente', `${response.primerNombre} con exito`, "success"  ) 
      },
      err => {
       this.errores = err.error.errors as String[];
      }
    );
  }
}
