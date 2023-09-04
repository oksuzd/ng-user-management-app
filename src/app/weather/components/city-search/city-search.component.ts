import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {WeatherStoreService} from "../../services/weather-store.service";
import {WeatherDataService} from "../../services/weather-data.service";
import {
  BehaviorSubject,
  catchError,
  debounceTime,
  Observable, of,
  Subject,
  switchMap,
  takeUntil,
  throwError
} from "rxjs";
import {WeatherLocation} from "../../models/weather-widget.models";

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CitySearchComponent implements OnInit, OnDestroy {

  inputCity = '';
  citiesVariants: WeatherLocation[] = [];

  private notifier$: Subject<null> = new Subject();
  private _inputCity$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  readonly inputCity$: Observable<string> = this._inputCity$.asObservable();

  constructor(
    private weatherStoreService: WeatherStoreService,
    private weatherDataService: WeatherDataService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.getCityVariants();
  }

  ngOnDestroy() {
    this.notifier$.next(null);
    this.notifier$.complete();
  }

  getCityVariants() {
    this.inputCity$
      .pipe(
        debounceTime(500),
        switchMap((inputText: string) => {
          if (inputText.length >= 3) {
            return this.weatherDataService.getAutocompleteCityResults(inputText);
          } else {
            return of([]);
          }
        }),
        catchError((err) => throwError(() => err)),
        takeUntil(this.notifier$)
      )
      .subscribe((locations) => {
        this.citiesVariants = locations;
        this.cdr.detectChanges();
      })
  }

  setSearchingCity(event: any) {
    this._inputCity$.next(event);
  }

  chooseCity(city: WeatherLocation) {
    this.weatherStoreService.setLocationState(city);
    this.clearSearch();
  }

  @HostListener('window:click', ['$event.target'])
  onClick(event: HTMLElement) {
    if (!event.classList.contains('search_city')) {
      this.clearSearch();
    }
  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    if (this.citiesVariants.length != 0 && event.key === 'Escape') {
      this.clearSearch();
    }
  }

  clearSearch() {
    this.citiesVariants = [];
    this.inputCity = '';
  }
}
