import * as mapboxgl from 'mapbox-gl';

export type SourceType = 'Tileset' | 'Boundary' | 'Esurvey' | 'Raster';
export type LayerType = 'fill' | 'line' | 'fill-extrusion';
export type layerConfig = {
  id: string;
  type: LayerType;
  source: string;
  paint: mapboxgl.AnyPaint;
  layout: mapboxgl.Layout;
  'source-layer'?: string;
  filter?: mapboxgl.Expression;
};

/**
 * Esurvey is the custom type for the generics 
 */
export type TilesetType = "Raster" | "Vector" | "Esurvey"


export type RoleTypes = "product_name" | "platfrom_name"

export type SearchOption = "Coordinate" | "SurveyId"
import * as mapboxgl from 'mapbox-gl';
