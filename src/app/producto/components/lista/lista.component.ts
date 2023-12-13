import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ProductoComponent } from '../../pages/producto/producto.component';
import { ActualizarComponent } from '../actualizar/actualizar.component';
import { ServiceService } from '../../service.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent {

  constructor( private service : ServiceService, private product: ProductoComponent, private dialog: MatDialog){}

  @Input() productData: any = {};

  ngOnChanges(){
  }


  delete(id:any){
    Swal.fire({
      title: '¿Estás seguro de eliminar el articulo?',
      text: '¡No puedes revertir los cambios!',
      icon: 'question',
      iconColor:'#2F4F4F',
      showCancelButton: true,
      confirmButtonColor: '#2F4F4F',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminalo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteProducto(id).subscribe(
          (res :any)=>{
            this.product.ngOnInit();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Articulo eliminado',
              showConfirmButton: false,
              timer: 1500,
              toast: true,
              customClass: {
                container: 'my-swal-container',
                title: 'my-swal-title',
                icon: 'my-swal-icon',
              },
              background: '##2F4F4F',
              })
            }
        );

      }
    });
  }

  edit(id:any){
   /* this.service.getOne(id).subscribe(
      (res:any)=>{
        const product = res;
        console.log(product)
      }
    );*/
    const dialogRef = this.dialog.open(ActualizarComponent, {
      width: '600px',
      height: '500px',
      data: { id: id },
    });
    dialogRef.afterClosed().subscribe(res=>{
      this.product.ngOnInit()
    })

  }
}
