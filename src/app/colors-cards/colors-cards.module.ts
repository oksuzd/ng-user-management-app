import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorsCardsComponent } from './pages/colors-cards/colors-cards.component';
import { RouterModule, Routes } from "@angular/router";
import { ColorCardItemComponent } from './components/color-card-item/color-card-item.component';
import { ColorsCardsService } from "./services/colors-cards.service";
import { HttpClientModule } from "@angular/common/http";

const routes: Routes = [
  {path: '', component: ColorsCardsComponent},
];

@NgModule({
  declarations: [
    ColorsCardsComponent,
    ColorCardItemComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    ColorsCardsService,
  ]
})
export class ColorsCardsModule {}
