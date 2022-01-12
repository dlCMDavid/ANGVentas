import { Component, OnInit } from '@angular/core';
import { ApiclienteService } from '../services/apicliente.service';
import { Response } from '../models/response';
import { DialogClienteComponent } from './dialog/dialogcliente.component';
import { MatDialog } from '@angular/material/dialog';
import { Cliente } from '../models/cliente';
import { DialogDeleteComponent } from '../common/delete/dialogdelete.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  public lst: any[] = [];
  public columnas : string[] = ['id','nombre','actions'];
  readonly width: string = "300px";

  constructor(
    private apiCliente: ApiclienteService,
    public dialog: MatDialog,
    public snackbar: MatSnackBar
  ) { 
  }

  ngOnInit(): void {
    this.getClientes();
  }

  // Obtiene los clientes y los añade a la lista que se muestra
  getClientes() {
    this.apiCliente.getClientes().subscribe(response => {
      this.lst = response.data;
    });
  }

  //Controla el boton nuevo mostrando un dialogo
  openAdd() {
    const dialogRef = this.dialog.open(DialogClienteComponent, {
      width: this.width
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getClientes();
    });
  }

  //Controla el boton editar mostrando un dialogo
  openEdit(cliente: Cliente) {
    const dialogRef = this.dialog.open(DialogClienteComponent, {
      width: this.width,
      data: cliente
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getClientes();
    });
  }

  //Controla el boton eliminar mostrando un dialogo
  delete(cliente: Cliente) {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: this.width,
      data: cliente
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiCliente.delete(cliente.id).subscribe(response =>{
          if (response.exito == 1) {
            this.snackbar.open("Cliente eliminado con exito","",{
              duration: 2000
            });
            this.getClientes();
          }
        })
      }
    });
  }
}
