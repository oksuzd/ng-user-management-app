import { Injectable, OnDestroy } from '@angular/core';
import { ColDef, GridApi, ICellRendererParams } from "ag-grid-community";
import { AgRowDeleteComponent } from "../grid-components/ag-row-delete/ag-row-delete.component";
import { catchError, Subject, take, takeUntil, tap, throwError } from "rxjs";
import { User, UserCellsParams } from "../../../models/user.model";
import { isEmailInvalid, isNameValid } from "../validators/user-validators";
import { DataService } from "../../../services/data.service";
import { StoreService } from "../../../services/store.service";

@Injectable()
export class UsersGridService implements OnDestroy {

  private notifier$: Subject<null> = new Subject();

  constructor(
    private dataService: DataService,
    private storeService: StoreService,
  ) {}

  ngOnDestroy() {
    this.notifier$.next(null);
    this.notifier$.complete();
  }

  getColDef(rowData: User[], gridApi: GridApi<User>): ColDef[] {
    return [
      {field: 'id', headerName: 'ID', minWidth: 40, maxWidth: 50},

      {
        field: 'avatar', headerName: '', maxWidth: 64, autoHeight: true, cellClass: 'user-avatar',
        cellRenderer: (params: ICellRendererParams) => `<img src="${params.value}" alt="avatar">`
      },

      {
        field: 'firstName', headerName: 'First Name', editable: true,
        cellClassRules: {
          ['invalid']: (params) => {
            return this.isTextValueInvalid(params.value);
          },
        }
      },

      {
        field: 'lastName', headerName: 'Last Name', editable: true,
        cellClassRules: {
          ['invalid']: (params) => {
            return this.isTextValueInvalid(params.value);
          },
        }
      },

      {
        field: 'email', headerName: 'Email', editable: true,
        cellClassRules: {
          ['invalid']: (params) => {
            return isEmailInvalid(params.value);
          },
        }
      },

      {
        field: 'id', headerName: '', maxWidth: 70, cellClass: 'cells-styling__center',
        cellRenderer: AgRowDeleteComponent,
        cellRendererParams: {
          onDelete: (entity: User) => {
            this.dataService.deleteUser(entity.id)
              .pipe(
                tap(() => {
                  rowData = rowData.filter((user) => user.id !== entity.id);
                  this.storeService.setUsersList(rowData);
                  gridApi.setRowData(rowData);
                }),
                take(1),
                takeUntil(this.notifier$),
                catchError((err) => throwError(() => err))
              )
              .subscribe();
          }
        } as UserCellsParams<User>
      }
    ];
  }

  isTextValueInvalid(value: string): boolean {
    return !value || value.trim() === '' || value.length < 3 || !isNameValid(value);
  }
}
