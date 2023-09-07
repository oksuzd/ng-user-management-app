import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from "./core/pages/home-page/home-page.component";
import { NotFoundPageComponent } from "./core/pages/not-found-page/not-found-page.component";
import { authGuard } from "./guards/users-admin.guard";

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {
    path: 'colors',
    loadChildren: () => import('./colors-cards/colors-cards.module')
      .then((m) => m.ColorsCardsModule),
  },
  {
    path: 'weather', loadChildren: () => import('./weather/weather.module')
      .then((m) => m.WeatherModule)
  },
  {
    path: 'admin/users',
    loadChildren: () => import('./admin/users/users.module')
      .then((m) => m.UsersModule),
    canActivate: [authGuard]
  },
  {path: '**', component: NotFoundPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
