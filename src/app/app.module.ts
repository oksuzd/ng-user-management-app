import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from "./core/core.module";
import { HomePageComponent } from './core/pages/home-page/home-page.component';
import { NotFoundPageComponent } from './core/pages/not-found-page/not-found-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from "./auth/auth.module";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { SharedModule } from "./shared/shared.module";
import { LoaderInterceptor } from "./interceptors/loader/loader.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NotFoundPageComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    AuthModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
