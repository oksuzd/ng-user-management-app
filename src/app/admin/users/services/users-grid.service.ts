import { Injectable, OnDestroy } from '@angular/core';
import { ColDef, GridApi, ICellRendererParams } from "ag-grid-community";
import { AgRowDeleteComponent } from "../grid-components/ag-row-delete/ag-row-delete.component";
import { catchError, Subject, take, takeUntil, tap, throwError } from "rxjs";
import { User, UserCellsParams } from "../../../models/user.model";
import { isNameValid } from "../validators/reg-name.validator";
import { UserDataService } from "../../../services/user-data.service";

@Injectable()
export class UsersGridService implements OnDestroy {

  private notifier$: Subject<null> = new Subject();

  constructor(
    private userDataService: UserDataService,
  ) {}

  ngOnDestroy() {
    this.notifier$.next(null);
    this.notifier$.complete();
  }

  getColDef(rowData: User[], gridApi: GridApi<User>): ColDef[] {
    return [
      {field: 'id', headerName: '', minWidth: 40, maxWidth: 50},

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
            return this.isEmailInvalid(params.value);
          },
        }
      },

      {
        field: 'id', headerName: '', maxWidth: 70, cellClass: 'cells-styling__center',
        cellRenderer: AgRowDeleteComponent,
        cellRendererParams: {
          onDelete: (entity) => {
            this.userDataService.deleteUser(entity.id)
              .pipe(
                tap(() => {
                  rowData = rowData.filter((user) => user.id !== entity.id);
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

  isEmailInvalid(email: string): boolean {
    const correctEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return !email?.toString().match(correctEmail);
  }
}
