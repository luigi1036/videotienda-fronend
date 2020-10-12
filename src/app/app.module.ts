import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer-component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteService } from './clientes/cliente.service';
import { RouterModule, Routes} from '@angular/router';
import {HttpClientModule } from '@angular/common/Http';
import { FormComponent } from './clientes/form.component';
import { FormsModule} from '@angular/forms';
import { ProductoComponent } from './producto/producto.component';
import{FormProducComponent} from './producto/formProduc.component';
import { PrestamosComponent } from './prestamos/prestamos.component';
import { FormPrestamosComponent } from './prestamos/form-prestamos.component';
  

const routes: Routes =[

  {path: '', redirectTo: '/clientes', pathMatch: 'full'},
  {path: 'clientes', component:ClientesComponent},
  {path:  'clientes/form', component: FormComponent},
  {path:  'clientes/form/:id', component: FormComponent},
  {path:  'productos', component:ProductoComponent},
  {path:  'productos/form', component: FormProducComponent},
  {path:  'productos/form/:id', component: FormProducComponent},
  {path:  'prestamos', component:PrestamosComponent},
  {path:  'prestamos/form', component: FormPrestamosComponent},
  {path:  'prestamos/form/:id', component: FormPrestamosComponent}


];

@NgModule({
  declarations: [
    AppComponent, 
    HeaderComponent,
    FooterComponent,
    ClientesComponent,
    FormComponent,
    ProductoComponent,
    FormProducComponent,
    PrestamosComponent,
    FormPrestamosComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ClienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
