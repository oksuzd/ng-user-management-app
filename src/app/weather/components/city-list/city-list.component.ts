import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, Subject, takeUntil, throwError } from "rxjs";
import { WeatherStoreService } from "../../services/weather-store.service";
import { WeatherLocation } from "../../models/weather-widget.models";
import { WeatherDataService } from "../../services/weather-data.service";

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CityListComponent implements OnInit, OnDestroy {

  currentLocation: WeatherLocation = {
    id: '',
    latitude: '',
    longitude: '',
  };
  listOfLocations: WeatherLocation[] = [];
  private notifier$: Subject<null> = new Subject();

  constructor(
    private weatherStoreService: WeatherStoreService,
    private weatherDataService: WeatherDataService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.listOfLocations = this.weatherDataService.loadLocalStorageLocationsList() ?? [];
    this.createSubscriptionOnLocation();
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.notifier$.next(null);
    this.notifier$.complete();
  }

  createSubscriptionOnLocation() {
    this.weatherStoreService.location$
      .pipe(
        takeUntil(this.notifier$),
        catchError((err) => throwError(() => err))
      )
      .subscribe((res) => {
        this.currentLocation = res;
        if (res.id !== '') {
          this.listOfLocations = this.listOfLocations
            .filter((loc) => loc.id !== res.id);
          this.listOfLocations.unshift(res);
          this.weatherDataService.saveLocalStorageLocationsList(this.listOfLocations);
          this.cdr.detectChanges();
        }
      });
  }

  chooseLocation(location: WeatherLocation) {
    this.weatherStoreService.setLocationState(location);
  }

  deleteLocation(location: WeatherLocation) {
    this.listOfLocations = this.listOfLocations.filter((res) => res.id !== location.id);
    this.cdr.detectChanges();
    this.weatherDataService.deleteLocalStorageLocationsItem(location.id);
  }

  clearLocationsList() {
    this.weatherDataService.clearLocalStorageLocationsList();
    this.listOfLocations = [];
    this.cdr.detectChanges();
  }
}
