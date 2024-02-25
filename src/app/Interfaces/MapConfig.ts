export interface MapConfig {
  source: string;
  zoom: number;
  latLong?: mapboxgl.LngLat;
  color?: string;
}
