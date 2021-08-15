import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {
  PAKISTAN_CENTER,
  Esurvey_ZOOM,
  SurveyId_Query_key,
} from 'src/assets/constants/constants';
import { UtilityService } from './utility.service';
@Injectable({
  providedIn: 'root',
})
export class SearchService {
  marker: mapboxgl.Marker | null;
  PAK_CENTER = new mapboxgl.LngLat(PAKISTAN_CENTER[0], PAKISTAN_CENTER[1]);

  map: mapboxgl.Map;

  zoomFlyBacks = {
    Coordinate: 5,
    'Field ID': Esurvey_ZOOM,
  };

  constructor() {
    this.marker = null;
  }

  searchQuery(
    searchOption: string,
    query: string,
    map: mapboxgl.Map,
    name: string
'Coordinate') {
      this.searchByCoordinate(query, map);
    } else if (searchOption === 'Field ID') {
      this.searchBySurveyId(query, map, name);
    }
  }

  searchByCoordinate(query: string, map: mapboxgl.Map) {
    if (!this.isValidCoordinateFormat(query)) {
      alert('Invalid coordinate format');
      return;
    }

    // Extract the longitude and latitude from the query
    const coords = query.split(',').map((coord) => parseFloat(coord.trim()));
    const [latitude, longitude] = coords;

    // Add a marker and fly to the location
    this.addMarker(longitude, latitude, map);
    map.flyTo({
      center: [longitude, latitude],
      essential: true,
      zoom: 15,
    });
  }

  // called Field ID now
  searchBySurveyId(query: string, map: mapboxgl.Map, TilesetId: string) {
    const result = map.queryRenderedFeatures(undefined, {
      layers: ['polygons-line' + TilesetId],
      filter: ['==', SurveyId_Query_key, query],
    });
    if (result.length === 0) {

 whole AOI is visible or Field ID is valid');
      return;
    }

    // get center
    const center = UtilityService.calculateCenterForPolygon(result[0]);
    const feature = result[0];
    map.flyTo({
      center: center,
      zoom: 15,
   // to be changed into a function that adds a line layer
    map.addLayer({
      id: 'highlighted-polygon',
      type: 'line',
      source: {
        type: 'geojson',
        data: feature,
      },
      paint: {
        'line-color': '#f00',
        'line-width': 2,
      },
    });
  }

  registerListeners(map: mapboxgl.Map) {
    this.map = map;
  }

  isValidCoordinateFormat(query: string) {
    const regex: RegExp = /^\-?\d+(\.\d+)?,\-?\d+(\.\d+)?$/;
    return regex.test(query);
  }
  instantiateGeocoder(map: mapboxgl.Map) {
    this.registerListeners(map);
e: number, latitude: number, map: mapboxgl.Map) {
    const el = document.createElement('div');
    el.className = 'marker';
    this.marker = new mapboxgl.Marker(el)
      .setLngLat([longitude, latitude])
      .addTo(map);
  }

  removeMarker() {
    if (!this.marker) {
      return;
    }
    this.marker.remove();
    this.marker = null;
  }

  resetSearchZoom(
    searchOption: string,
    map: mapboxgl.Map,
    center: mapboxgl.LngLat
  ) {
    const zoom =
      this.zoomFlyBacks[searchOption as keyof typeof this.zoomFlyBacks];

    if (map.getSource('highlighted-polygon')) {
      map
        .removeLayer('highlighted-polygon')
        .removeSource('highlighted-polygon');
    }
    if (!zoom) {
      console.error('Zoom not found');
      return;
    }

    this.removeMarker();
    map.flyTo({
      center: center,
      zoom: zoom,
    });
  }
  addEventsToMarker(map: mapboxgl.Map) {
    if (!this.marker) {
ment().addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }
}
