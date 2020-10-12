import { Component, OnInit } from '@angular/core';
import { Prestamo } from './prestamo';
import { PrestamoService } from './prestamo.service';


@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html'
})
export class PrestamosComponent implements OnInit {

  prestamo:Prestamo[];

  constructor(private prestamoService: PrestamoService) { }

  ngOnInit() {
    this.prestamoService.getPrestamos().subscribe(
      prestamo => this.prestamo = prestamo)
  }

}
