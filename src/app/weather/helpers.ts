export namespace Helper {
  export function getQuery(q: string): string {
    return q.split(' ').join('+').toLowerCase();
  }

  export function getLocationId(
    lat: string | number,
    lon: string | number,
    city: string | undefined,
    code: string): string {

    const _lat = lat.toString().split('.')[0];
    const _lon = lon.toString().split('.')[0];
    const _city = city ? city.toLowerCase().split(' ').join('-') : '';
    const _code = code.toLowerCase();

    return `${_lat},${_lon},${_city},${_code}`;
  }
}