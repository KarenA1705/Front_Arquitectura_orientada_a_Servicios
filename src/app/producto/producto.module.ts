import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

import { ProductoRoutingModule } from './producto-routing.module';
import { ProductoComponent } from './pages/producto/producto.component';
import { ListaComponent } from './components/lista/lista.component';
import { CrearComponent } from './components/crear/crear.component';
import { ActualizarComponent } from './components/actualizar/actualizar.component';
import { EliminarComponent } from './components/eliminar/eliminar.component';
import { ReactiveFormsModule } from '@angular/forms'
import {MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    ProductoComponent,
    ListaComponent,
    CrearComponent,
    ActualizarComponent,
    EliminarComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    ProductoRoutingModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatTooltipModule
  ]
})
export class ProductoModule { }
