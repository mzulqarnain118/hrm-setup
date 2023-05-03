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
    return center;
  }

  static calculateCenterForFeatureCollection(featureCollection: any) {
    const centroid = turf.centroid(featureCollection);
    const [longitude, latitude] = centroid.geometry.coordinates;
    return new mapboxgl.LngLat(longitude, latitude);
  }

  static preparePopup(popupHtml: string, popupDiv: HTMLElement | null) {
        if (popupDiv) {
      popupDiv.innerHTML = popupHtml;
      popupDiv.style.opacity = '1';
    }
  }

  static CalculateBounds(geojson: turf.FeatureCollection): mapboxgl.LngLatBounds {
    const bounds = new mapboxgl.LngLatBounds();

    geojson.features.forEach(feature => {
      const geometry: turf.Geometry = feature.geometry as turf.Geometry;
      if (geometry.type === 'MultiPolygon') {
        const multiPolygon: turf.MultiPolygon = geometry as turf.MultiPolygon;
        multiPolygon.coordinates.forEach(polygon => {
          polygon.forEach(ring => {
            ring.forEach(coord => {
              bounds.extend(coord as [number, number]);
            });
          });
        });
      }
    });

    return bounds;
  }

  static AddMarkerToMap(){
  }
import { Injectable } from '@angular/core';
