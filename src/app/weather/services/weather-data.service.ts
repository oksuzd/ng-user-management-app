import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { WeatherCurrentData, WeatherLocation } from "../models/weather-widget.models";
import {
  CitiesPhotosResponseData,
  GeoLocationResponseData,
  GeoResult,
  IpGeoResponseData,
  WeatherResponseData
} from "../models/weather-response.models";
import {
  CITY_PHOTOS_API_KEY,
  CITY_PHOTOS_URL,
  GEOAPIFY_KEY,
  GEOAPIFY_URL,
  IP_GEO_API_KEY,
  IP_GEO_URL,
  WEATHER_API_KEY,
  WEATHER_URL
} from "../weather.constants";
import { Helper } from "../helpers";


@Injectable()
export class WeatherDataService {

  private readonly photoWidth = 544;
  private readonly photoHeight = 406;

  constructor(private http: HttpClient) {}

  // example: https://api.ipgeolocation.io/ipgeo?apiKey=663e519677484f7389ade9e2f226c0eb

  getIpLocation(): Observable<WeatherLocation> {
    const url = IP_GEO_URL + `ipgeo?apiKey=${IP_GEO_API_KEY}`;

    return this.http.get<IpGeoResponseData>(url)
      .pipe(
        map((res) => this.mapIpLocation(res))
      );
  }

  // example: https://api.geoapify.com/v1/geocode/reverse?lat=52.51894887928074&lon=13.409808180753316&type=city&lang=en&limit=10&format=json&apiKey=YOUR_API_KEY

  getGeoLocationByCoordinates(lat: string, lon: string): Observable<WeatherLocation> {
    const url = GEOAPIFY_URL + `reverse?lat=${lat}&lon=${lon}
    &type=city&lang=en&limit=1&format=json&apiKey=${GEOAPIFY_KEY}`;

    return this.http.get<GeoLocationResponseData>(url)
      .pipe(
        map((res) => this.mapWeatherLocation(res.results[0]))
      );
  }

  // example: https://api.geoapify.com/v1/geocode/autocomplete?text=buen&limit=5&type=city&format=json&apiKey=d062e33a6330458e8916f4d31c04d69c

  getAutocompleteCityResults(text: string): Observable<WeatherLocation[]> {
    const url = GEOAPIFY_URL + `autocomplete?text=${text}&limit=5
    &type=city&format=json&apiKey=${GEOAPIFY_KEY}`;

    return this.http.get<GeoLocationResponseData>(url)
      .pipe(
        map((res) => this.mapWeatherLocationsList(res))
      );
  }

  getCityPhotos(q: string): Observable<string[]> {
    let url = CITY_PHOTOS_URL + `?key=${CITY_PHOTOS_API_KEY}&q=${Helper.getQuery(q)}&orientation=horizontal&category
    =backgrounds&min_width=${this.photoWidth}min_height=${this.photoHeight}&image_type=photo&pretty=true`;

    return this.http.get<CitiesPhotosResponseData>(url)
      .pipe(
        map((res) => this.mapPhotos(res)),
      );
  }

  // example: https://api.weatherapi.com/v1/current.json?key=a0c823c543f94e27bf8113242230108&q=BuenosAires

  getWeatherData(q: string): Observable<WeatherCurrentData> {
    const url = WEATHER_URL + `current.json?key=${WEATHER_API_KEY}&q=${Helper.getQuery(q)}&`;

    return this.http.get<WeatherResponseData>(url)
      .pipe(
        map((res) => this.mapWeatherData(res))
      );
  }

  private mapWeatherData(data: WeatherResponseData): WeatherCurrentData {
    const cur = data.current;

    return {
      tempCelsius: cur.temp_c,
      conditionText: cur.condition.text,
      conditionIcon: cur.condition.icon,
      windSpeedKph: cur.wind_kph,
      windDir: cur.wind_dir,
      pressureMb: cur.pressure_mb,
      humidity: cur.humidity,
      feelsLike: cur.feelslike_c,
      visibilityKm: cur.vis_km,
      uv: cur.uv,
    };
  }

  private mapPhotos(data: CitiesPhotosResponseData): string[] {
    return data.hits
      .filter((hit) => hit.webformatHeight >= this.photoHeight)
      .map((hit) => hit.webformatURL);
  }

  private mapIpLocation(data: IpGeoResponseData): WeatherLocation {
    return {
      id: Helper.getLocationId(data.latitude, data.longitude, data.city, data.country_code2),
      latitude: data.latitude.toString(),
      longitude: data.longitude.toString()
    };
  }

  mapWeatherLocationsList(data: GeoLocationResponseData): WeatherLocation[] {
    let weatherLocationsList: WeatherLocation[] = [];
    data.results.forEach((res) => {
      if (res.city) {
        weatherLocationsList.push(this.mapWeatherLocation(res));
      }
    });
    return weatherLocationsList;
  }

  mapWeatherLocation(data: GeoResult): WeatherLocation {
    return {
      id: Helper.getLocationId(data.lat, data.lon, data.city, data.country_code),
      latitude: String(data.lat),
      longitude: String(data.lon),
      country: data.country,
      countryCode: data.country_code,
      city: data.city,
      formatted: data.formatted
    };
  }

  saveLocalStorageLocationsList(data: WeatherLocation[]): void {
    localStorage.setItem('locationsList', JSON.stringify(data));
  }

  loadLocalStorageLocationsList(): WeatherLocation[] | null {
    return JSON.parse(localStorage.getItem('locationsList')!);
  }

  deleteLocalStorageLocationsItem(id: string) {
    let items: WeatherLocation[] = JSON.parse(localStorage.getItem('locationsList')!);
    items = items.filter((res) => res.id !== id);
    localStorage.setItem('locationsList', JSON.stringify(items));
  }

  clearLocalStorageLocationsList() {
    localStorage.removeItem('locationsList');
  }
}
