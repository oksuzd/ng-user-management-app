export interface WeatherLocation {
  id: string;
  country?: string;
  countryCode?: string;
  city?: string;
  formatted?: string;
  latitude: string;
  longitude: string;
}

export interface WeatherCurrentData {
  tempCelsius: number;
  conditionText: string;
  conditionIcon: string;
  windSpeedKph: number;
  windDir: string;
  pressureMb: number;
  humidity: number;
  feelsLike: number;
  visibilityKm: number;
  uv: number;
}
