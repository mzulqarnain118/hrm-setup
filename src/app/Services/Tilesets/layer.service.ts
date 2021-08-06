import { Injectable } from '@angular/core';
import Tileset from '../../_Interfaces/Tileset';
import { getPaintAndLineWidth } from '../../_utils/paintHandler';
import {  layerConfig } from 'src/app/_Types/types';
@Injectable({
videdIn: 'root'
})
export class LayerService {

  constructor() { }

  AddFillLayer(tileset: Tileset, map: mapboxgl.Map) {
    const layerType = 'fill';
    const FillPrefix = layerType + tileset.name;

    const { paint } = getPaintAndLineWidth(tileset.name, layerType, tileset.TilesetType);
    let layerConfig: layerConfig = {
      // TODO: work this ID out
      id: FillPrefix,
      type: 'fill',
ileset.name,
      layout: {
        visibility: tileset.visible ? 'visible' : 'none',
      },
      paint: paint,
    };
    if (tileset.TilesetType == 'Tileset' || tileset.TilesetType == 'Esurvey') {
      layerConfig['source-layer'] = tileset.name;
    }

    map.addLayer(layerConfig as mapboxgl.FillLayer);
  }

  AddLineLayer(tileset: Tileset, map: mapboxgl.Map) {
    const layerType = 'polygons-line';
    const LinePrefix = layerType + tileset.name;
    const { paint } = getPaintAndLineWidth(tileset.name, layerType, tileset.TilesetType);

    let layerConfig: layerConfig = {
      id: LinePrefix,
      type: 'line',
      source: tileset.name,
      layout: {
        visibility: tileset.visible ? 'visible' : 'none',
      },
      paint: paint,
    };
    if (tileset.TilesetType == 'Tileset' || tileset.TilesetType == 'Esurvey') {
      layerConfig['source-layer'] = tileset.name;
    }
    map.addLayer(layerConfig as mapboxgl.LineLayer);
  }


  AddHoverLayer(tileset: Tileset , map: mapboxgl.Map) {
    const layerType: string = 'polygons-line-hover';
    const LineHoverPrefix: string = layerType + tileset.name;
    const { paint } = getPaintAndLineWidth(tileset.name, layerType, tileset.TilesetType);

    id: LineHoverPrefix,
      type: 'line',
      source: tileset.name,
      layout: {
        visibility: 'visible',
      },
      paint: paint,
      filter: ['==', 'id', ''],
    };
    if (tileset.TilesetType == 'Tileset' || tileset.TilesetType == 'Esurvey') {
      layerConfig['source-layer'] = tileset.name;
    }
    map.addLayer(layerConfig as mapboxgl.LineLayer);
  }
}