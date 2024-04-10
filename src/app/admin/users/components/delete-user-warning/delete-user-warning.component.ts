import { Component } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-delete-user-warning',
  templateUrl: './delete-user-warning.component.html',
  styleUrls: ['./delete-user-warning.component.scss']
})
export class DeleteUserWarningComponent {

  constructor(public dialogRef: MatDialogRef<DeleteUserWarningComponent>) {}

  onNoClick() {
    this.dialogRef.close();
  }
}
