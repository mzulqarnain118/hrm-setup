import { Injectable } from '@angular/core';
import Tileset from 'src/app/_Interfaces/Tileset';

@Injectable({
  providedIn: 'root'
})
export class VectorTilesetService {

  constructor() { }


  removeTileset(tileset: Tileset , map: mapboxgl.Map) {
    if (tileset.name == '') {
      return;
    }

    if (!map.getSource(tileset.name)) {
      return;
    }

    if (tileset.name.toLowerCase().includes('points')) {
      this.removePointsSource(map, tileset);
      return;
    }
    if (tileset.name.toLowerCase().includes('roads')) {
      this.removePointsSource(map, tileset);
      return;
    }

    // Put this in a function as well its all over code base 
    map.removeLayer('fill' + tileset.name);
    map.removeLayer('polygons-line' + tileset.name);
    //map.removeLayer('polygons-line-hover' + tileset.name);
    map.removeSource(tileset.name);
  }

 // TODO: rename this 
  removePointsSource(map: mapboxgl.Map, tileset: Tileset) {
    map.removeLayer(tileset.name).removeSource(tileset.name)
  }
}
