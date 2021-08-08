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
