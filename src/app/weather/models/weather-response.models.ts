export interface IpGeoResponseData {
  ip: string;
  continent_code: string;
  continent_name: string;
  country_code2: string;
  country_code3: string;
  country_name: string;
  country_capital: string;
  state_prov: string;
  state_code: string;
  district: string;
  city: string;
  zipcode: string;
  latitude: string;
  longitude: string;
  is_eu: boolean;
  calling_code: string;
  country_tld: string;
  languages: string;
  country_flag: string;
  geoname_id: string;
  isp: string;
  connection_type: string;
  organization: string;
  currency: Currency;
  time_zone: TimeZoneIp;
}

interface Currency {
  code: string;
  name: string;
  symbol: string;
}

interface TimeZoneIp {
  name: string;
  offset: number;
  offset_with_dst: number;
  current_time: string;
  current_time_unix: number;
  is_dst: boolean;
  dst_savings: number;
}

export interface GeoLocationResponseData {
  results: GeoResult[];
  query?: GeoQuery;
}

interface GeoQuery {
  lat: number;
  lon: number;
  plus_code: string;
}

export interface GeoResult {
  datasource: GeoDatasource;
  country: string;
  country_code: string;
  city: string;
  lon: number;
  lat: number;
  postcodes?: string[];
  distance?: number;
  result_type: string;
  formatted: string;
  address_line1: string;
  address_line2: string;
  category: string;
  timezone: GeoTimezone;
  plus_code: string;
  rank: Rank;
  place_id: string;
  bbox?: Bbox;
  district?: string;
  county?: string;
  state?: string;
  plus_code_short?: string;
  state_district?: string;
  state_code?: string;
}

interface Bbox {
  lon1: number;
  lat1: number;
  lon2: number;
  lat2: number;
}

interface GeoDatasource {
  sourcename: string;
  attribution: string;
  license: string;
  url: string;
}

interface Rank {
  importance: number;
  popularity: number;
  confidence_city_level?: number;
  match_type?: string;
}

interface GeoTimezone {
  name: string;
  offset_STD: string;
  offset_STD_seconds: number;
  offset_DST: string;
  offset_DST_seconds: number;
  abbreviation_STD?: string;
  abbreviation_DST?: string;
}

export interface WeatherResponseData {
  location: Location;
  current: Current;
}

interface Current {
  last_updated_epoch: number;
  last_updated: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: Condition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
}

interface Condition {
  text: string;
  icon: string;
  code: number;
}

interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

export interface CitiesPhotosResponseData {
  total: number;
  totalHits: number;
  hits: Hit[];
}

interface Hit {
  id: number;
  pageURL: string;
  type: Type;
  tags: string;
  previewURL: string;
  previewWidth: number;
  previewHeight: number;
  webformatURL: string;
  webformatWidth: number;
  webformatHeight: number;
  largeImageURL: string;
  imageWidth: number;
  imageHeight: number;
  imageSize: number;
  views: number;
  downloads: number;
  collections: number;
  likes: number;
  comments: number;
  user_id: number;
  user: string;
  userImageURL: string;
}

enum Type {
}
