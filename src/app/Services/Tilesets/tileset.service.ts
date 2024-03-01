import { Injectable } from '@angular/core';
import Tileset from '../../_Interfaces/Tileset';
import * as mapboxgl from 'mapbox-gl';
import { SourceType } from 'src/app/_Types/types';
import { RasterTilesetService } from './raster-tileset.service';
import { ApiService } from '../api.service';
import { VectorTilesetService } from './vector-tileset.service';
import { MAPBOX_USERNAME } from 'src/assets/constants/constants';
import { LayerService } from './layer.service';
import { UtilityService } from '../utility.service';
import { renderPopupHtml } from 'src/app/_utils/popUpHtml';
import { Observable, filter, map, tap } from 'rxjs';
import { SharedStateService } from '../shared-state.service';
import { getPaintAndLineWidth } from 'src/app/_utils/paintHandler';
import { layerConfig } from 'src/app/_Types/types';

@Injectable({
  providedIn: 'root',
})
export class TilesetService {
  constructor(
    private rasterTilesetService: RasterTilesetService,
    private apiService: ApiService,
    private layerService: LayerService,
    private VectorTilesetService: VectorTilesetService,
    private SharedStateService: SharedStateService
  ) {}
  // function that takes tileset IDs and returns appropriate settings
  initializeTilesets(tileset_ids: string[]): Tileset[] {
    const tilesetMapping = tileset_ids.map((tilesetId) => ({
      name: tilesetId,
      visible: this.visibilitySettings(tilesetId),
      // if its points then prefixes are "" else they are "fill-" and "line-"
      // FillPrefix: tilesetId.toLowerCase().includes('points') ? '' : `fill`,
      FillPrefix: this.getFillPrefix(tilesetId),
      // LinePrefix: tilesetId.toLowerCase().includes('points')
      //   ? ''
      //   : `polygons-line`,
      LinePrefix: this.getLinePrefix(tilesetId),
      // HoverPrefix: tilesetId.toLowerCase().includes('points')
      //   ? ''
      //   : `polygons-line-hover`,
      HoverPrefix: this.getHoverPrefix(tilesetId),
      TilesetType: 'Tileset' as SourceType,
    }));

    return tilesetMapping;
  }

  getFillPrefix(tileset_name: string): string {
    return tileset_name.toLowerCase().includes('points') ||
      tileset_name.toLowerCase().includes('roads')
      ? ''
      : 'fill';
  }

  getLinePrefix(tileset_name: string): string {
    return tileset_name.toLowerCase().includes('points') ||
      tileset_name.toLowerCase().includes('roads')
      ? ''
      : 'polygons-line';
  }

  getHoverPrefix(tileset_name: string): string {
    return tileset_name.toLowerCase().includes('points') ||
      tileset_name.toLowerCase().includes('roads')
      ? ''
      : 'polygons-line-hover';
  }
  /**
   * @description function that takes tileset IDs and returns default visibility settings
        NOTE: Points sources are catered here when they come along as tileset IDS
        as some clients have esurvey polygons and points
   * @param tileset_id 
   * @returns 
   */
  visibilitySettings(tileset_id: string): boolean {
    return tileset_id.includes('points') ||
      tileset_id.toLowerCase().includes('other') ||
      tileset_id.toLowerCase().includes('orchards') ||
      tileset_id.toLowerCase().includes('cotton') ||
      tileset_id.toLowerCase().includes('banana') ||
      tileset_id.toLowerCase().includes('canola') ||
      tileset_id.toLowerCase().includes('rice') ||
      tileset_id.toLowerCase().includes('urban') ||
      tileset_id.toLowerCase().includes('temporal') ||
      tileset_id.toLowerCase().includes('roads')
      ? false
      : true;
  }

  changeTilesetColor(tileset: Tileset, map: mapboxgl.Map) {
    // map.setPaintProperty('otherveg', 'fill-color', tileset.FillColor);
  }
  // This toggles raster as well as vector tilesets
  toggleTileset(tileset: Tileset, map: mapboxgl.Map) {
    let newVisibility = 'none';

    // TODO: Refactor this
    if (tileset.name.toLowerCase().includes('roads')) {
      const visibility = map.getLayoutProperty(`${tileset.name}`, 'visibility');
      if (!(visibility === 'visible')) {
        newVisibility = 'visible';
      }
      map.setLayoutProperty(`${tileset.name}`, 'visibility', newVisibility);
      return;
    }

    let visibility = map.getLayoutProperty(
      `${tileset.FillPrefix}${tileset.name}`,
      'visibility'
    );

    if (visibility === undefined) visibility = 'visible';

    if (!(visibility === 'visible')) {
      newVisibility = 'visible';
    }
    if (tileset.name.toLowerCase().includes('points')) {
      map.moveLayer(tileset.name);
    }

    map.setLayoutProperty(
      `${tileset.FillPrefix}${tileset.name}`,
      'visibility',
      newVisibility
    );

    // Early return if tileset is raster as it does not have line and hover layers
    if (tileset.TilesetType === 'Raster') {
      return;
    }
    map.setLayoutProperty(
      `${tileset.LinePrefix}${tileset.name}`,
      'visibility',
      newVisibility
    );
    map.setLayoutProperty(
      `${tileset.HoverPrefix}${tileset.name}`,
      'visibility',
      newVisibility
    );
    return;
  }

  // Function to update raster tilesets
  UpdateRaster(tileset: Tileset, map: mapboxgl.Map, prevTileset: Tileset) {
    this.rasterTilesetService.changeRaster(tileset, map, prevTileset);
  }

  RemoveRaster(tileset: Tileset, map: mapboxgl.Map) {
    console.log('removing raster', tileset);
    this.rasterTilesetService.removeRaster(tileset, map);
  }

  // Wrapper function to add tilesets
  addTilesets(
    tileset_ids: Tileset[],
    map: mapboxgl.Map,
    popupDiv: HTMLElement | null
  ) {
    console.log('adding tilesets', tileset_ids);
    tileset_ids.forEach((tilesetId) => {
      this.addTileset(tilesetId, map, popupDiv);
    });
  }

  // Function to add tileset sources
  addTileset(
    tileset: Tileset,
    map: mapboxgl.Map,
    popupDiv: HTMLElement | null
  ) {
    if (tileset.name == '' || !tileset || map.getSource(tileset.name)) {
      return;
    }

    // handle points source
    if (tileset.name.toLowerCase().includes('points')) {
      return this.HandlePointsSource(tileset, map, popupDiv);
    }

    if (tileset.name.toLowerCase().includes('roads')) {
      return this.HandleRoadsSource(tileset, map, popupDiv);
    }

    console.log('asml', tileset.name);
    map.addSource(tileset.name, {
      type: 'vector',
      url: `mapbox://${MAPBOX_USERNAME}.${tileset.name}`,
      minzoom: 6,
      maxzoom: 20,
    });

    // if esurvey then fix prefixes
    if (tileset.name.toLowerCase().includes('esurvey')) {
      tileset.FillPrefix = 'fill';
      tileset.LinePrefix = 'polygons-line';
      tileset.HoverPrefix = 'polygons-line-hover';
    }

    this.AddVectorLayer(tileset, map);
    //click event
    this.addTilesetOnclick(tileset.name, map);
    // hover
    this.bindTilsetMouseEvents(tileset.name, map, popupDiv);
  }

  // FIXME: Add consistency to the constants
  HandleRoadsSource(
    tileset: Tileset,
    map: mapboxgl.Map,
    popupDiv: HTMLElement | null
  ) {
    // multiliinestring source
    map.addSource(tileset.name, {
      type: 'vector',
      url: `mapbox://${MAPBOX_USERNAME}.${tileset.name}`,
      minzoom: 7,
      maxzoom: 22,
    });
    // add fill layer
    map.addLayer({
      id: tileset.name,
      type: 'line',
      source: tileset.name,
      'source-layer': tileset.name,
      paint: {
        'line-color': '#0096FF',
        'line-width': 1.5,
      },
      layout: {
        visibility: tileset.visible ? 'visible' : 'none',
      },
    });

    // nill prefixes
    tileset.FillPrefix = '';
    tileset.LinePrefix = '';
    tileset.HoverPrefix = '';
  }

  bindTilsetMouseEvents(
    source: string,
    _map: mapboxgl.Map,
    popupDiv: HTMLElement | null
  ) {
    const _sourceFill = 'fill' + source;
    const _sourceHover = 'polygons-line-hover' + source;

    _map.on('click', _sourceFill, (e) => {
      if (_map.getZoom() < 10) {
        return;
      }

      // main check
      // TODO:  HANDLE THIS PROPETLY THROUGH THE CURRENT OBSERVABLES ( IF POSSIBLE)
      if (
        !source.toLowerCase().includes('esurvey') &&
        this.SharedStateService.isEsurveyVisible
      ) {
        return;
      }
      _map.getCanvas().style.cursor = 'zoom-in';
      // set poup display back
      popupDiv!.style.display = 'block';
      const properties = e.features![0].properties;


      const latLong = e.lngLat;
      const obj = { lat: latLong.lat, lng: latLong.lng };
      const currentBoundry = e.features![0].source;
      const popupHtml: string = renderPopupHtml(
        properties,
        currentBoundry,
        obj
      );

      UtilityService.preparePopup(popupHtml, popupDiv!);

      if (this.SharedStateService.combinedTilesetNames.includes(source)) {
        e['stopProp'] = true;
      }

      _map.setFilter(_sourceHover, [
        '==',
        'id',
        e.features![0].properties!['id'],
      ]);

    });
  }
  addTilesetOnclick(source: string, _map: mapboxgl.Map) {
    const _source = 'fill' + source;

    // TODO: Remove this click listener when the tileset is removed
    const mapClick$ = new Observable((observer: any) => {
      _map.on('click', _source, (e) => observer.next(e));
    });

    const subscription = mapClick$
      .pipe(
        filter(() => _map.getZoom() >= 12),
        filter(() => {
          if (source.toLowerCase().includes('esurvey')) {
            return true;
          }
          return !this.SharedStateService.isEsurveyVisible;
        }),
        map((e: any) => {
          e['stopProp'] = true; // Stopping the evnt bubbling
          return {
            features: _map.queryRenderedFeatures(e.point, {
              layers: [_source],
            }),
            e,
          };
        }),
        filter(({ features }) => features.length > 0),
        tap(({ e }) => _map.flyTo({ center: e.lngLat, animate: true }))
      )
      .subscribe((values) => {});
    //Store subscription in an array so we can clean it up later.
    //this.clickSubscriptions.push(subscription);
  }

  AddVectorLayer(source: Tileset, map: mapboxgl.Map) {
    this.layerService.AddFillLayer(source, map);
    this.layerService.AddLineLayer(source, map);
    this.layerService.AddHoverLayer(source, map);
  }

  // Function to handle points source
  HandlePointsSource(
    tileset: Tileset,
    map: mapboxgl.Map,
    popupDiv: HTMLElement | null
  ) {
    // resetting prefixes
    tileset.FillPrefix = '';
    tileset.LinePrefix = '';
    tileset.HoverPrefix = '';
    let minzoom = 9;
    if (tileset.name.toLowerCase().includes('tubewell')) {
      minzoom = 0;
    }
    map.addSource(tileset.name, {
      type: 'vector',
      url: `mapbox://${MAPBOX_USERNAME}.${tileset.name}`,
      minzoom: minzoom,
      maxzoom: 22,
    });
    let color = '#FF0000';
    if (tileset.name.includes('reval')) {
      color = '#B87333';
    }
    map.addLayer({
      id: tileset.name,
      type: 'circle',
      source: tileset.name,
      'source-layer': tileset.name,
      paint: {
        'circle-radius': 4,
        'circle-color': color,
        'circle-opacity': 1,
      },
      layout: {
        visibility: tileset.visible ? 'visible' : 'none',
      },
    });

    map.moveLayer(tileset.name);

    map.on('mousemove', tileset.name, (e) => {
      const features = map.queryRenderedFeatures(e.point, {
        layers: [tileset.name],
      });

      // Check if there's at least one feature found.
      if (features.length) {
        const feature = features[0];

        map.getCanvas().style.cursor = 'pointer';

        // send data to hover
        const properties = feature.properties;
        const latLong = e.lngLat;
        const obj = { lat: latLong.lat, lng: latLong.lng };
        const currentBoundry = e.features![0].source;
        const popupHtml: string = renderPopupHtml(
          properties,
          currentBoundry,
          obj
        );
        UtilityService.preparePopup(popupHtml, popupDiv);
      }

      e['stopProp'] = true;
    });

    // Add on click event
    map.on('click', tileset.name, (e) => {
      const features = map.queryRenderedFeatures(e.point, {
        layers: [tileset.name],
      });

      // Check if there's at least one feature found.
      if (features.length) {
        const feature = features[0];
        const properties = feature.properties;
        const latLong = e.lngLat;
        const obj = { lat: latLong.lat, lng: latLong.lng };
        const currentBoundry = e.features![0].source;
        const popupHtml: string = renderPopupHtml(
          properties,
          currentBoundry,
          obj
        );
        UtilityService.preparePopup(popupHtml, popupDiv);
      }

      e['stopProp'] = true;
    });
  }

  removeTilesets(tilesets: Tileset[], map: mapboxgl.Map) {
    console.log('removing tilesets', tilesets);
    if (!tilesets) {
      return;
    }
    tilesets.forEach((tileset) => {
      this.removeTileset(tileset as Tileset, map);
    });
  }

  removeTileset(tileset: Tileset, map: mapboxgl.Map) {
    this.VectorTilesetService.removeTileset(tileset, map);
  }
}
import { Injectable } from '@angular/core';
