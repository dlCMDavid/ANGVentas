import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    templateUrl: "dialogdelete.component.html"
})

export class DialogDeleteComponent{
    constructor(
        // Esto permite referiar al propio dialogo para poder cerrarlo...
        public dialogRef: MatDialogRef<DialogDeleteComponent>
    ){
        
    }
}