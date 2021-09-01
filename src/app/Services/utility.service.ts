import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  constructor() {}

  static calculateCenterForPolygon(feature: any): mapboxgl.LngLat {
    const bounds = new mapboxgl.LngLatBounds();
    (feature.geometry as any).coordinates[0].forEach((coord: any) => {
      bounds.extend(coord);
nst center = bounds.getCenter();
