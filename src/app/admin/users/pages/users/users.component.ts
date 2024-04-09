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
import { DataService } from "../../../../services/data.service";
import { User } from "../../../../models/user.model";
import { UsersGridService } from "../../services/users-grid.service";
import { isEmailInvalid } from "../../validators/user-validators";
import { StoreService } from "../../../../services/store.service";

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
    private dataService: DataService,
    private storeService: StoreService,
    public usersGridService: UsersGridService,
    public dialog: MatDialog,
  ) {
  }

  ngOnDestroy() {
    this.notifier$.next(null);
    this.notifier$.complete();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    this.dataService.getUsersFromServer()
      .pipe(
        take(1),
        takeUntil(this.notifier$),
        catchError((err) => throwError(() => err))
      )
      .subscribe((data: User[]) => {
        this.rowData = data;
        this.storeService.setUsersList(data);
        this.columnDefs = this.usersGridService.getColDef(this.rowData, this.gridApi);
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

  onClickAddUser() {
    const dialogRef = this.dialog.open(AddUserComponent, {width: '350px'});
    dialogRef.afterClosed()
      .subscribe((res) => {
        !!res && this.addUser(res);
      });
  }

  private addUser(user: User) {
    this.dataService.addNewUser({...user})
      .pipe(
        take(1),
        takeUntil(this.notifier$),
        catchError((err) => throwError(() => err))
      )
      .subscribe((res) => {
          this.storeService.addUserToTheList(res);
          this.rowData = this.storeService.getUsersList();
          this.gridApi.setRowData(this.rowData);
          this.gridApi.refreshCells();
        }
      );
  }

  private updateUser(user: User) {
    this.dataService.updateUser(user)
      .pipe(
        take(1),
        takeUntil(this.notifier$),
        catchError((err) => throwError(() => err))
      )
      .subscribe((res) => {
          const itemIndex: number = this.rowData.findIndex((user) => user.id === res.id);
          this.rowData[itemIndex] = res;
          this.gridApi.setRowData(this.rowData);
          this.storeService.setUsersList(this.rowData);
        }
      );
  }

  private isUserDataValid(user: User): boolean {
    return !this.usersGridService.isTextValueInvalid(user.firstName) &&
      !this.usersGridService.isTextValueInvalid(user.lastName) &&
      !isEmailInvalid(user.email);
  }
}
