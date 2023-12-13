import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductoComponent } from '../../pages/producto/producto.component';
import { ServiceService } from '../../service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.scss']
})
export class ActualizarComponent {

  proEdit: any;
  id: string = '';

  editForm: FormGroup = new FormGroup({
    nombre : new FormControl(),
    valor : new FormControl(),
    img : new FormControl()
  });

  constructor(

    private service : ServiceService,
    private dialogRef : MatDialogRef<ActualizarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

    ) {

  }
  closeModal(){
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.id = this.data.id;
    this.getProduct(this.id);
  }

  getProduct(id: any){
   this.service.getOne(id).subscribe(
     (res :any)=>{
      this.editForm.patchValue({
        nombre: res.data[0].nombre,
        valor: res.data[0].valor,
        img: res.data[0].img
      });
      }
   )
  }

  edit(){
    if (this.editForm.valid) {
      const data = {
        nombre: this.editForm.get('nombre')?.value,
        valor: this.editForm.get('valor')?.value,
        img: this.editForm.get('img')?.value,
      }
      console.log(data);
      this.service.putProducto(this.id, data).subscribe(
        (resp) => {
          Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'producto editado',
          showConfirmButton: false,
          timer: 1500,
          toast: true,
          customClass: {
            container: 'my-swal-container',
            title: 'my-swal-title',
            icon: 'my-swal-icon',
          },
          background: '#E6F4EA',
          })
          this.dialogRef.close();
          this.editForm.reset();
        },
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

}
