import { Component, OnInit } from '@angular/core';
import { Producto } from './producto';
import{ProductoService} from './producto.service'

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html'
})
export class ProductoComponent  {

  producto:Producto[];

  constructor(private ProductoService: ProductoService) { }

  ngOnInit(){
    this.ProductoService.getProductos().subscribe(
      producto => this.producto = producto
    )
  }

}
