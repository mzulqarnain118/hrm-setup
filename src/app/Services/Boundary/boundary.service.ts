import { Injectable } from '@angular/core';
import { PAKISTAN_BOUNDS } from 'src/assets/constants/constBoundaries';
import { ApiService } from '../api.service';
import { LayerService } from '../Tilesets/layer.service';
import Tileset from 'src/app/_Interfaces/Tileset';
import { SharedStateService } from '../shared-state.service';
import { UtilityService } from '../utility.service';
import * as mapboxgl from 'mapbox-gl';
import { renderPopupHtml } from 'src/app/_utils/popUpHtml';
import { DEFAULT_ZOOM } from 'src/assets/constants/constants';

@Injectable({
  providedIn: 'root',
})
export class BoundaryService {
  constructor(
    private backendService: ApiService,
    private layerService: LayerService,
    private SharedStateService: SharedStateService
  ) {
    
  }

  public allBoundarySources: string[] = [];

  private _clickHandler: (e: any) => void;
  private currentClientCenter: mapboxgl.LngLat;

  async configureGeojsonSource(
    BoundaryName: string,
    map: mapboxgl.Map,
    zoom: number,
    popupDiv: HTMLElement | null
  ) {
    await this.addSource(BoundaryName, map);
    this.AddBoundaryLayer(BoundaryName, zoom, map);
    this.bindMouseEvents(BoundaryName, map, popupDiv);
  }

  async addSource(source: string, map: mapboxgl.Map) {
    console.log('adding source', source);
    // if source exists then return
    if (map.getSource(source)) {
      return;
    }

    const data = await this.getSourceGeoJson(
      source,
      this.SharedStateService.getCurrentSeasonValue(),
      this.SharedStateService.getReportTypeValue(),
      this.SharedStateService.getCurrentDateValue(),
      this.SharedStateService.getCurrentCropValue(),
    );
    console.log('data', data);
    // if (source == 'aoi') {
    //   this.storeAOIcenter(data);
    // }
    try {
      console.log("addinng source")
      map.addSource(source, {
        type: 'geojson',
        data: data,
      });
    } catch (error) {
      console.log('error', error);
    }

    if (source == 'Country') return;
    this.allBoundarySources.push(source);
  }

  // Hover functionalities
  bindMouseEvents(
    source: string,
    map: mapboxgl.Map,
    popupDiv: HTMLElement | null
  ) {

    const _sourceFill = 'fill' + source;

    map.on('click', _sourceFill, (e) => {

      if (e['stopProp'] == true) {
        console.log('stopProp', _sourceFill);
        return;
      }
  
      map.getCanvas().style.cursor = 'zoom-in';
      // Set popup display to block
      popupDiv!.style.display = 'block';
  
      const properties = e.features![0].properties;
      const currentBoundry = e.features![0].source;
      const latLong = e.lngLat;
      const obj = { lat: latLong.lat, lng: latLong.lng };
  
      const popupHtml: string = renderPopupHtml(
        properties,
        currentBoundry,
        obj
      );
      UtilityService.preparePopup(popupHtml, popupDiv!);
  
      if (_sourceFill.includes(this.SharedStateService.combinedTilesetNames)) {
        e.defaultPrevented;
      }
    });
  }
  AddGeoJsonLayer(source: Tileset, zoomLevel: number, map: mapboxgl.Map) {
    this.layerService.AddFillLayer(source, map);
    this.layerService.AddLineLayer(source, map);
   // this.layerService.AddHoverLayer(source, map);
    // add layer on click
    this.addLayerOnclick(source, zoomLevel, map);
  }

  addLayerOnclick(tileset: Tileset, zoomLevel: number, map: mapboxgl.Map) {
    const _source = 'fill' + tileset.name;

    this._clickHandler = (e) => {
      if (map.getZoom() > 5 && tileset.name == 'Country') {
        return;
      }
      if (e['stopProp'] == true) {
        const properties = e.features![0].properties;
        const boundary = properties!['id'];
        // this.clickedBoundaryId.next(boundary);
        this.SharedStateService.updateClickedBoundaryId(boundary);
        return;
      }
      e.originalEvent.preventDefault();

      map.flyTo({
        center: e.lngLat,
        zoom: zoomLevel,
      });

      map.getCanvas().style.cursor = 'pointer';
      const properties = e.features![0].properties;
      const boundary = properties!['id'];

      this.SharedStateService.updateClickedBoundaryId(boundary);
      this.SharedStateService.updateClickedBoundaryName(
        properties!['Boundary Name']
      );
    };

    // Use the property to add the event
    map.on('click', _source, this._clickHandler);
  }

  getClientCenter() {
    return this.currentClientCenter;
  }

  hideBoundaryLayer(source: string, map: mapboxgl.Map) {
    // return if layer doesn't exist
    if (!map.getLayer('fill' + source)) {
      return;
    }
    // set visibiliy to none
    map.setLayoutProperty('fill' + source, 'visibility', 'none');
    map.setLayoutProperty('polygons-line' + source, 'visibility', 'none');
    //map.setLayoutProperty('polygons-line-hover' + source, 'visibility', 'none');
  }


  updateSourceBoundaries(zoom: number, map: mapboxgl.Map) {
    this.allBoundarySources.forEach((source) => {
      this.removeSource(source, map);
      //map.off('click', 'fill' + source, this._clickHandler);
    });
    this.allBoundarySources = [];
  }

  removeSource(source: string, map: mapboxgl.Map) {
    if (map.getLayer('fill' + source)) {
      console.log('removing source', source);
      map
        .removeLayer('fill' + source)
        .removeLayer('polygons-line' + source)
        // .removeLayer('polygons-line-hover' + source)
        .removeSource(source);
    }
  }
  storeAOIcenter(data: any) {
    this.currentClientCenter =
      UtilityService.calculateCenterForFeatureCollection(data);
  }

  async getSourceGeoJson(
    source: string,
    currentSeason: string,
    ReportType: string,
    currentDate: string,
    currentCrop: string
  ): Promise<GeoJSON.FeatureCollection<GeoJSON.Geometry>> {
    if (source === 'Country') {
      return JSON.parse(JSON.stringify(PAKISTAN_BOUNDS));
    }
    return (await this.backendService.getGeojson(
      currentSeason,
      source,
      ReportType,
      currentDate.split('T')[0],
      currentCrop
    )) as GeoJSON.FeatureCollection<GeoJSON.Geometry>;
  }

  // this is handling on click for every polygon of the boundary dataset right now
  AddBoundaryLayer(source: string, zoomLevel: number, map: mapboxgl.Map) {
    // If the source already exists then just change the visibility to visible
    if (map.getLayer('fill' + source)) {
      // if the layers of source exist just change visibility to visible
      map.setLayoutProperty('fill' + source, 'visibility', 'visible');
      map.setLayoutProperty('polygons-line' + source, 'visibility', 'visible');
      // map.setLayoutProperty(
      //   'polygons-line-hover' + source,
      //   'visibility',
      //   'visible'
      // );
      return;
    }
    const tileset: Tileset = {
      name: source,
      visible: true,
      FillPrefix: 'fill',
      LinePrefix: 'polygons-line',
      HoverPrefix: 'polygons-line-hover',
      TilesetType: 'Boundary',
    };
    // Fill layer with completely transparent fill
    this.AddGeoJsonLayer(tileset, zoomLevel, map);
  }

  // flyToclientCentre
  flyToClientCenter(map: mapboxgl.Map) {
    if (!this.currentClientCenter) {
      return;
    }

    map.flyTo({
      center: this.currentClientCenter,
      zoom: 5,
    });
  }

getAoiAndStoreCenterasync() {
     this.getSourceGeoJson(
      'aoi',
      this.SharedStateService.getCurrentSeasonValue(),
      this.SharedStateService.getReportTypeValue(),
      this.SharedStateService.getCurrentDateValue(),
      this.SharedStateService.getCurrentCropValue()
    ).then((data) => {
      this.storeAOIcenter(data);
    });
  }
}
import { Injectable } from '@angular/core';
import { PAKISTAN_BOUNDS } from 'src/assets/constants/constBoundaries';
import { ApiService } from '../api.service';
import { LayerService } from '../Tilesets/layer.service';
import Tileset from 'src/app/_Interfaces/Tileset';
import { SharedStateService } from '../shared-state.service';
import { UtilityService } from '../utility.service';
import * as mapboxgl from 'mapbox-gl';
import { renderPopupHtml } from 'src/app/_utils/popUpHtml';
import { DEFAULT_ZOOM } from 'src/assets/constants/constants';

@Injectable({
  providedIn: 'root',
})
export class BoundaryService {
  constructor(
    private backendService: ApiService,
    private layerService: LayerService,
    private SharedStateService: SharedStateService
  ) {
    
  }

  public allBoundarySources: string[] = [];

  private _clickHandler: (e: any) => void;
  private currentClientCenter: mapboxgl.LngLat;

  async configureGeojsonSource(
    BoundaryName: string,
    map: mapboxgl.Map,
    zoom: number,
    popupDiv: HTMLElement | null
  ) {
    await this.addSource(BoundaryName, map);
    this.AddBoundaryLayer(BoundaryName, zoom, map);
e, map, popupDiv);
  }

  async addSource(source: string, map: mapboxgl.Map) {
    console.log('adding source', source);
    // if source exists then return
    if (map.getSource(source)) {
      return;
    }

    const data = await this.getSourceGeoJson(
      source,
      this.SharedStateService.getCurrentSeasonValue(),
      this.SharedStateService.getReportTypeValue(),
      this.SharedStateService.getCurrentDateValue(),
      this.SharedStateService.getCurrentCropValue(),
    );
    console.log('data', data);
    // if (source == 'aoi') {
    //   this.storeAOIcenter(data);
    // }
    try {
      console.log("addinng source")
      map.addSource(source, {
        type: 'geojson',
        data: data,
      });
    } catch (error) {
      console.log('error', error);
    }

    if (source == 'Country') return;
    this.allBoundarySources.push(source);
  }

  // Hover functionalities
  bindMouseEvents(
    source: string,
    map: mapboxgl.Map,
    popupDiv: HTMLElement | null
source;

    map.on('click', _sourceFill, (e) => {

      if (e['stopProp'] == true) {
        console.log('stopProp', _sourceFill);
        return;
      }
  
      map.getCanvas().style.cursor = 'zoom-in';
      // Set popup display to block
      popupDiv!.style.display = 'block';
  
      const properties = e.features![0].properties;
      const currentBoundry = e.features![0].source;
      const latLong = e.lngLat;
      const obj = { lat: latLong.lat, lng: latLong.lng };
  
      const popupHtml: string = renderPopupHtml(
        properties,
        currentBoundry,
        obj
      );
      UtilityService.preparePopup(popupHtml, popupDiv!);
  
ludes(this.SharedStateService.combinedTilesetNames)) {
        e.defaultPrevented;
      }
 });
  }
  AddGeoJsonLayer(source: Tileset, zoomLevel: number, map: mapboxgl.Map) {
    this.layerService.AddFillLayer(source, map);
    this.layerService.AddLineLayer(source, map);
   // this.layerService.AddHoverLayer(source, map);
    // add layer on click
    this.addLayerOnclick(source, zoomLevel, map);
  }

  addLayerOnclick(tileset: Tileset, zoomLevel: number, map: mapboxgl.Map) {
    const _source = 'fill' + tileset.name;

    this._clickHandler = (e) => {
      if (map.getZoom() > 5 && tileset.name == 'Country') {
        return;
      }
      if (e['stopProp'] == true) {
        const properties = e.features![0].properties;
        const boundary = properties!['id'];
        // this.clickedBoundaryId.next(boundary);
        this.SharedStateService.updateClickedBoundaryId(boundary);
        return;
      }
      e.originalEvent.preventDefault();

      map.flyTo({
        center: e.lngLat,
        zoom: zoomLevel,
      });

      map.getCanvas().style.cursor = 'pointer';
      const properties = e.features![0].properties;
      const boundary = properties!['id'];

      this.SharedStateService.updateClickedBoundaryId(boundary);
ClickedBoundaryName(
        properties!['Boundary Name']
      );
    };

    // Use the property to add the event
    map.on('click', _source, this._clickHandler);
  }
ientCenter() {
