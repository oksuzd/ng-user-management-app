import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {WeatherComponent} from './pages/weather/weather.component';
import {RouterModule, Routes} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../shared/shared.module";
import {WeatherDataService} from "./services/weather-data.service";
import {DayWeatherComponent} from './components/day-weather/day-weather.component';
import {CityListComponent} from './components/city-list/city-list.component';
import {CitySearchComponent} from './components/city-search/city-search.component';
import {WeatherStoreService} from "./services/weather-store.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
  {path: '', component: WeatherComponent},
];

@NgModule({
  declarations: [
    WeatherComponent,
    DayWeatherComponent,
    CityListComponent,
    CitySearchComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    WeatherDataService,
    WeatherStoreService
  ]
})
export class WeatherModule {}
