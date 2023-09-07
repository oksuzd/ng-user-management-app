import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, filter, forkJoin, of, Subject, switchMap, takeUntil, throwError } from "rxjs";
import { WeatherDataService } from "../../services/weather-data.service";
import { WeatherCurrentData } from "../../models/weather-widget.models";
import { WeatherStoreService } from "../../services/weather-store.service";

@Component({
  selector: 'app-day-weather',
  templateUrl: './day-weather.component.html',
  styleUrls: ['./day-weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class DayWeatherComponent implements OnInit, OnDestroy {

  cityWeather!: WeatherCurrentData;
  cityPhotos!: string[];
  cityName = '';
  private notifier$: Subject<null> = new Subject();

  constructor(
    private weatherServiceData: WeatherDataService,
    private weatherStoreService: WeatherStoreService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.setWeather();
  }

  ngOnDestroy() {
    this.notifier$.next(null);
    this.notifier$.complete();
  }

  setWeather() {
    this.weatherStoreService.location$
      .pipe(
        filter((res) => !!res.city),
        switchMap((res) => {
          const cityQuery = `${res.city!} ${res.country!}`;
          return forkJoin([
            this.weatherServiceData.getCityPhotos(cityQuery),
            this.weatherServiceData.getWeatherData(cityQuery),
            of(res.city!)
          ]);
        }),
        takeUntil(this.notifier$),
        catchError((err) => throwError(() => err))
      )
      .subscribe(([photos, weather, city]) => {
        this.cityPhotos = photos;
        this.cityWeather = weather;
        this.cityName = city;
        this.cdr.detectChanges();
      });
  }

  getBackgroundImage(): string {
    if (this.cityPhotos.length > 0) {
      let randUrl = this.cityPhotos[Math.floor(Math.random() * this.cityPhotos.length)];
      return `url(${randUrl})`;
    }
    return 'url(assets/img/weather.jpg)';
  }
}
