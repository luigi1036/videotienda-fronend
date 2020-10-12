import { Component, OnInit } from '@angular/core';
import{Producto} from './producto';
import{ProductoService} from './producto.service';
import{Router, ActivatedRoute} from '@angular/router';
import swal  from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './formProduc.component.html'
})
export class FormProducComponent implements OnInit {

  
  public producto: Producto = new Producto();
  public titulo: string = 'Formulario de Productos';

  constructor(private productoService: ProductoService, private router: Router, 
    private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarProducto();
  }


  cargarProducto(): void{
    this.activatedRouter.params.subscribe(params =>{
      let id = params['id']
      if(id){
        console.log(id)
        this.productoService.getProducto(id).subscribe((producto)=>this.producto = producto)
      }
    });
  }

  public create():void{
    this.productoService.create(this.producto).subscribe(producto =>{
         this.router.navigate(['/productos'])
         swal('Nuevo Producto', `Producto ${this.producto.nombre} creado con exito`, "success"  ) 
      },
      err => {
      });
   }

   update():void{
    this.productoService.update(this.producto).subscribe(
      response =>{
        console.log(response)
        this.router.navigate(['/productos'])
        swal('Se Actualizo el Producto', `${response.nombre} con exito`, "success"  ) 
      },
      err => {
      }
    );
  }

}
