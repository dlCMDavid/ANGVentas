import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Cliente } from "src/app/models/cliente";
import { ApiclienteService } from "src/app/services/apicliente.service";

@Component({
    templateUrl: 'dialogcliente.component.html'
})
export class DialogClienteComponent {
    public nombre: string = "";

    constructor(
        public dialogRef: MatDialogRef<DialogClienteComponent>,
        public apiCliente: ApiclienteService,
        public snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public cliente: Cliente
    ) {
        if (this.cliente != null) {
            this.nombre = cliente.nombre;
        }
        
    }

    //Cierra el dialogo
    close() {
        this.dialogRef.close();
    }

    //Edita un  cliente
    editCliente() {
        const cliente : Cliente = { nombre: this.nombre, id: this.cliente.id};
        this.apiCliente.edit(cliente).subscribe(response => {
            if(response.exito == 1) {
                this.dialogRef.close();
                // Mensaje que indica que se a guardado con exito
                this.snackBar.open("Cliente editado con exito",'',{
                    duration: 2000
                });
            } 
        });
    }

    //Añade un nuevo cliente
    addCliente() {
        const cliente : Cliente = { nombre: this.nombre, id: 0};
        this.apiCliente.add(cliente).subscribe(response => {
            if(response.exito == 1) {
                this.dialogRef.close();
                // Mensaje que indica que se a guardado con exito
                this.snackBar.open("Cliente insertado con exito",'',{
                    duration: 2000
                });
            } 
        });
    }
}