import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "./components/header/header.component";
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { SharedModule } from "../shared/shared.module";
import { RouterLink } from "@angular/router";

@NgModule({
  declarations: [
    HeaderComponent,
    SideMenuComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterLink,
  ],
  exports: [
    HeaderComponent,
    SideMenuComponent,
  ]
})
export class CoreModule {
}
