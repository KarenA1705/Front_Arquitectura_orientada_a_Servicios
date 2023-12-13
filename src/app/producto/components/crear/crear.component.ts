import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../../service.service';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent {
  constructor(
    private service : ServiceService,
    private dialogRef : MatDialogRef<CrearComponent>,
    ) {}

  saveForm: FormGroup = new FormGroup({
    nombre : new FormControl(),
    valor : new FormControl(),
    detalle: new FormControl(),
    img : new FormControl(),
  });

  save(){
    if (this.saveForm.valid) {

      const data = {
        nombre: this.saveForm.get('nombre')?.value,
        detalle :this.saveForm.get('detalle')?.value,
        valor: this.saveForm.get('valor')?.value,
        img: this.saveForm.get('img')?.value,
      }
      console.log(data);

      this.service.postProducto( data).subscribe(
        (resp) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            iconColor:'#2F4F4F',
            title: 'Producto agregado',
            showConfirmButton: false,
            timer: 2500,
            toast: true,
            customClass: {
              container: 'my-swal-container',
              title: 'my-swal-title',
              icon: 'my-swal-icon',
            },
            background: '#E6F4EA',
          });
          this.dialogRef.close();
          this.saveForm.reset();
        },
        (ERR :any)=> {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            iconColor:'#2F4F4F',
            title: 'Error intente de nuevo',
            showConfirmButton: false,
            timer: 1500,
            toast: true,
            customClass: {
              container: 'my-swal-container',
              title: 'my-swal-title',
              icon: 'my-swal-icon',
              popup: 'my-swal-popup',
             },
           })
        }
       );
    }
    else{
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        iconColor:'#2F4F4F',
        title: 'Campos vacios, ingreselos todos',
        showConfirmButton: false,
        timer: 1500,
        toast: true,
        customClass: {
          container: 'my-swal-container',
          title: 'my-swal-title',
          icon: 'my-swal-icon',
          popup: 'my-swal-popup',
         },
       })
    }


  }

  closeModal(){
    this.dialogRef.close();
  }
}
