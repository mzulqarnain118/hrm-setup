import { Injectable } from '@angular/core';
import Tileset from 'src/app/_Interfaces/Tileset';
import * as mapboxgl from 'mapbox-gl';
import { MAPBOX_USERNAME } from 'src/assets/constants/constants';
@Injectable({
  providedIn: 'root',
})
export class RasterTilesetService {
  constructor() {}

  changeRaster(rasterTileset: Tileset, map: mapboxgl.Map, prevTileset: Tileset) {
    // remove prev if exists
    let FillPrefix = 'fill' + prevTileset.name;
    if (map.getSource(FillPrefix)) {

      map.removeLayer(FillPrefix).removeSource(FillPrefix);
    }
    FillPrefix = 'fill' + rasterTileset.name;
    // add new
    map.addSource(FillPrefix, {
      type: 'raster',
      url: `mapbox://${MAPBOX_USERNAME}.${rasterTileset.name}`,
    });
    
    map.addLayer({
      id: FillPrefix,
      type: 'raster',
      source: FillPrefix,
    });
  }

  removeRaster(rasterTileset: Tileset, map: mapboxgl.Map) {
    let FillPrefix = 'fill' + rasterTileset.name;
    if (map.getSource(FillPrefix)) {
      map.removeLayer(FillPrefix).removeSource(FillPrefix);
    }
  }
}
