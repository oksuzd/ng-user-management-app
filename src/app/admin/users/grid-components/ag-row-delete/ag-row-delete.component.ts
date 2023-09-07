import { Component } from '@angular/core';
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";
import { MatDialog } from "@angular/material/dialog";
import { UserCellsParams } from "../../../../models/user.model";
import { DeleteUserWarningComponent } from "../../components/delete-user-warning/delete-user-warning.component";

@Component({
  selector: 'app-ag-row-delete',
  templateUrl: './ag-row-delete.component.html',
  styleUrls: ['./ag-row-delete.component.scss']
})

export class AgRowDeleteComponent implements ICellRendererAngularComp {

  params!: ICellRendererParams & UserCellsParams;

  constructor(public dialog: MatDialog) {}

  agInit(params: ICellRendererParams & UserCellsParams) {
    this.params = params;
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }

  deleteUser() {
    const dialogRef = this.dialog.open(DeleteUserWarningComponent, {width: '400px'});
    dialogRef.afterClosed()
      .subscribe((res) => {
        if (!!res) {
          this.params.onDelete(this.params.data);
        }
      });
  }
}
