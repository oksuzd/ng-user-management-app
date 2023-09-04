import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { AgGridModule } from "ag-grid-angular";
import { SharedModule } from "../../shared/shared.module";
import { ReactiveFormsModule } from '@angular/forms';

import { UsersComponent } from './pages/users/users.component';
import { AgRowDeleteComponent } from './grid-components/ag-row-delete/ag-row-delete.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { UniqueEmailValidator } from "./validators/unique-email.validator";
import { UsersGridService } from "./services/users-grid.service";
import { DeleteUserWarningComponent } from './components/delete-user-warning/delete-user-warning.component';

const routes: Routes = [
  {path: '', component: UsersComponent},
];

@NgModule({
  declarations: [
    AddUserComponent,
    UsersComponent,
    AgRowDeleteComponent,
    DeleteUserWarningComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    AgGridModule,
    ReactiveFormsModule
  ],
  providers: [
    UniqueEmailValidator,
    UsersGridService
  ]
})

export class UsersModule {}
