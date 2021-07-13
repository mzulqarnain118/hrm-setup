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
