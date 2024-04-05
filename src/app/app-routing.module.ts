import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from "./core/pages/home-page/home-page.component";
import { NotFoundPageComponent } from "./core/pages/not-found-page/not-found-page.component";
import { authGuard } from "./guards/users-admin.guard";

const routes: Routes = [
  {path: '', component: HomePageComponent},
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
