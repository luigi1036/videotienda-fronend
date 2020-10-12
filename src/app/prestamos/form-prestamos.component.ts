import { Component, OnInit } from '@angular/core';
import { Prestamo } from './prestamo';
import { PrestamoService } from './prestamo.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal  from 'sweetalert2';


@Component({
  selector: 'app-form-prestamos',
  templateUrl: './form-prestamos.component.html'
})
export class FormPrestamosComponent implements OnInit {

  
public prestamo: Prestamo = new Prestamo();
  public titulo: string = 'Formulario de Prestamos';

  constructor(private prestamoService : PrestamoService, private router : Router,
    private activatedRouter: ActivatedRoute) { }

    ngOnInit(): void {
      this.cargarPrestamos();
    }
  
    cargarPrestamos(): void{
      this.activatedRouter.params.subscribe(params =>{
        let id = params['id']
        if(id){
          this.prestamoService.getPrestamo(id).subscribe((prestamo)=>this.prestamo = prestamo)
        }
      });
    }
  
    public create():void{
     this.prestamoService.create(this.prestamo).subscribe(cliente =>{
          this.router.navigate(['/prestamos'])
          swal('Nuevo Prestamo', `Prestamo ${this.prestamo.id} creado con exito`, "success"  ) 
       },
       err => {
        console.log(err.error.errors);
       });
    }
  
    update():void{
      this.prestamoService.update(this.prestamo).subscribe(
        response =>{
          console.log(response)
          this.router.navigate(['/prestamos'])
          swal('Se Actualizo el Prestamo', `${response.id} con exito`, "success"  ) 
        },
        err => {
        }
      );
    }

  }