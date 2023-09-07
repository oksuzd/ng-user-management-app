import { Component, OnDestroy } from '@angular/core';
import { catchError, Subject, take, takeUntil, throwError } from "rxjs";

import {
  CellValueChangedEvent,
  ColDef,
  GridApi,
  GridReadyEvent,
} from "ag-grid-community";

import { MatDialog } from "@angular/material/dialog";
import { AddUserComponent } from "../../components/add-user/add-user.component";
import { UserDataService } from "../../../../services/user-data.service";
import { User } from "../../../../models/user.model";
import { UsersGridService } from "../../services/users-grid.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnDestroy {

  rowData: User[] = [];
  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    cellClass: 'cells-styling',
  };
  columnDefs: ColDef[] = [];

  private gridApi!: GridApi<User>;
  private notifier$: Subject<null> = new Subject();

  constructor(
    private userDataService: UserDataService,
    public usersGridService: UsersGridService,
    public dialog: MatDialog
  ) {}

  ngOnDestroy() {
    this.notifier$.next(null);
    this.notifier$.complete();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    this.userDataService.getUsers()
      .pipe(
        take(1),
        takeUntil(this.notifier$),
        catchError((err) => throwError(() => err))
      )
      .subscribe((data) => {
        this.rowData = data;
        this.columnDefs = this.usersGridService.getColDef(data, this.gridApi);
      });
  }

  onCellValueChanged(event: CellValueChangedEvent) {
    if (this.isUserDataValid(event.data)) {
      this.updateUser(event.data);
      this.sizeToFit();
    }
  }

  sizeToFit() {
    if (this.gridApi) {
      this.gridApi.sizeColumnsToFit();
    }
  }

  addUser() {
    const dialogRef = this.dialog.open(AddUserComponent, {width: '350px'});
    dialogRef.afterClosed()
      .subscribe((res) => {
        !!res && this.createUser(res);
      });
  }

  private createUser(user: User) {
    this.userDataService.createUser({
      ...user,
      id: 0
    })
      .pipe(
        take(1),
        takeUntil(this.notifier$),
        catchError((err) => throwError(() => err))
      )
      .subscribe((res) => {
          this.rowData.push(res);
          this.gridApi.setRowData(this.rowData);
        }
      );
  }

  private updateUser(user: User) {
    this.userDataService.updateUser(user)
      .pipe(
        take(1),
        takeUntil(this.notifier$),
        catchError((err) => throwError(() => err))
      )
      .subscribe((res) => {
          const itemIndex = this.rowData.findIndex((user) => user.id === res.id);
          this.rowData[itemIndex] = res;
          this.gridApi.setRowData(this.rowData);
        }
      );
  }

  private isUserDataValid(user: User) {
    return !this.usersGridService.isTextValueInvalid(user.firstName) &&
      !this.usersGridService.isTextValueInvalid(user.lastName) &&
      !this.usersGridService.isEmailInvalid(user.email);
  }
}
