import {Injectable} from '@angular/core';
import {WeatherLocation} from "../models/weather-widget.models";
import {BehaviorSubject, Observable} from "rxjs";

export const initialLocation: WeatherLocation = {
  id: '',
  latitude: '',
  longitude: '',
}

@Injectable()
export class WeatherStoreService {

  private _location$: BehaviorSubject<WeatherLocation> = new BehaviorSubject<WeatherLocation>(initialLocation);
  readonly location$: Observable<WeatherLocation> = this._location$.asObservable();

  setLocationState(data: WeatherLocation) {
    this._location$.next(data);
  }

  getLocationState(): WeatherLocation {
    return this._location$.getValue();
  }
}
