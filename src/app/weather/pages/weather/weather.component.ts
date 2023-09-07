import { Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, Subject, switchMap, takeUntil, throwError } from "rxjs";
import { WeatherDataService } from "../../services/weather-data.service";
import { WeatherStoreService } from "../../services/weather-store.service";


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit, OnDestroy {

  private notifier$: Subject<null> = new Subject();

  constructor(
    private weatherDataService: WeatherDataService,
    private weatherStoreService: WeatherStoreService,
  ) {}

  ngOnInit() {
    if (this.weatherStoreService.getLocationState().id === '') {
      this.weatherDataService.getIpLocation()
        .pipe(
          switchMap((res) => {
            return this.weatherDataService.getGeoLocationByCoordinates(res.latitude, res.longitude);
          }),
          catchError((err) => throwError(() => err)),
          takeUntil(this.notifier$),
        )
        .subscribe((res) => {
          this.weatherStoreService.setLocationState(res);
        });
    }
  }

  ngOnDestroy() {
    this.notifier$.next(null);
    this.notifier$.complete();
  }
}
