import { Inject } from '@angular/core';
import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent {
  dialogMessage: string;
  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public obj: any){
    this.dialogMessage = obj.message;
  }

  closeDialog():void{
    this.dialogRef.close();
  }

  delete(){
    this.dialogRef.close(this.obj.id);
  }

}
