import Tileset from 'src/app/_Interfaces/Tileset';

export const DEFAULT_REPORT = 'Crop Scan';
export const PAKISTAN_CENTER = [69.3941914, 29.9689954];
export const MAPBOX_USERNAME = 'ali-akber-79';

// TODO : Change to this a backend API call
export const BASE_STYLE_URL =
  'mapbox://styles/ali-akber-79/clmqh6svs026o01r46xxxg1hg';
export const DEFAULT_ZOOM = 3.1;
export const AOI_ZOOM = 5;
t Esurvey_ZOOM = 10;
export const SurveyId_Query_key = 'Field ID';
// Either a source is a tileset or a geojson
// Tileset refers to dataset on mapbox whereas geojson refers to a file

// TODO : If flow is shifted to MBTiles then the whole thing needs to be updated
export const initialTilesetStateEsurvey: Tileset = {
  name: '',
  visible: false,
  FillPrefix: 'fill',
  LinePrefix: 'polygons-line',
ix: 'polygons-line-hover',
  TilesetType: 'Esurvey',
};

export const initialTilesetStateRaster: Tileset = {
  name: '',
  visible: false,
  FillPrefix: 'fill',
  LinePrefix: 'polygons-line',
  HoverPrefix: 'polygons-line-hover',
  TilesetType: 'Raster',
};

export const menuList = [
  { key: 'dashboard', icon: 'dashboard', title: 'Dashboard' },
  { key: 'cropscan', icon: 'dashboard', title: 'Cropscan' },
  { key: 'agrichain', icon: 'ic_recruitment', title: 'Agrichain' },
  { key: 'yieldpro', icon: 'ic_calendar', title: 'Yield Pro' },
  { key: 'reporting', icon: 'ic_calendar', title: 'Reporting' },
];

export const totalAreaGraphTypes = [
  { product_name: 'Cropscan', graphs: 'Acreage by Classes/Crops' },
  { product_name: 'Cropscan', graphs: 'Acreage by variety' },
  { product_name: 'Cropscan', graphs: 'Acreage by Main Crop' },
  { product_name: 'Sowing Date', graphs: 'Acreage by variety' },
  { product_name: 'Arable Land', graphs: 'Acreage by classes/ crops' },
];


export const eSurveyGraphTypes = [
  { product_name: 'Sowing Date', graphs: 'Sowing Analysis' },
  { product_name: 'eSurvey', graphs: 'eSurvey by date' },
  { product_name: 'Harvest', graphs: 'Harvest Monitering' },
];
