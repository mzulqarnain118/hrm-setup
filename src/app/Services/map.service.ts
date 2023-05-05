import { Injectable, signal } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {
  BehaviorSubject,
  Observable,
  ReplaySubject,
  Subject,
  combineLatest,
  delay,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  of,
  pairwise,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import {
  DEFAULT_ZOOM,
  PAKISTAN_CENTER,
  BASE_STYLE_URL,
  initialTilesetStateEsurvey,
  initialTilesetStateRaster,
  Esurvey_ZOOM,
  DEFAULT_REPORT,
} from 'src/assets/constants/constants';
import { environment } from '../../environments/environment';
import { ApiService } from './api.service';
import Tileset from '../_Interfaces/Tileset';
import { SearchService } from './search.service';
import { TilesetService } from './Tilesets/tileset.service';
import { BoundaryService } from './Boundary/boundary.service';
import { SharedStateService } from './shared-state.service';
import { LandmarksService } from './landmarks.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  map: mapboxgl.Map;
  markers: mapboxgl.Marker[] = []; ;

  PAK_CENTER = new mapboxgl.LngLat(PAKISTAN_CENTER[0], PAKISTAN_CENTER[1]);

  private popupDiv: HTMLElement | null;

  private zoomLevelSubject = new BehaviorSubject<number>(DEFAULT_ZOOM);
  zoomLevel$ = this.zoomLevelSubject.asObservable();

  private mapLoaded = new Subject<boolean>();
  mapLoaded$ = this.mapLoaded.asObservable();

  private currentTilesets = new BehaviorSubject<Tileset[]>([]);
  currentTilesets$ = this.currentTilesets.asObservable();

  private rasterTileset = new BehaviorSubject<Tileset>(
    initialTilesetStateRaster
  );
  rasterTileset$ = this.rasterTileset.asObservable();

  clickSubscriptions: any[];

  private eSurveyTileset = new BehaviorSubject<Tileset>(
    initialTilesetStateEsurvey
  );
  eSurveyTileset$ = this.eSurveyTileset.asObservable();

  private _combinedTilesetsSubject$ = new BehaviorSubject<Tileset[]>([]);
  public combinedTilesetsObservable$ =
    this._combinedTilesetsSubject$.asObservable();

  private landmarksLoaded = false;
  combinedTilesets$ = combineLatest([
    this.currentTilesets$,
    this.eSurveyTileset$,
  ]).pipe(
    map(([currentTilesetsArray, eSurveyTileset]) => {
      return [...currentTilesetsArray, eSurveyTileset] as Tileset[];
    }),
    tap((combinedTilesets: Tileset[]) => {
      const combinedTilesetNames = combinedTilesets
        .map((tileset) => tileset.name)
        .join('');
      this.SharedStateService.updatedCombinedTilesetNames(combinedTilesetNames);
    })
  );

  constructor(
    private backendService: ApiService,
    private searchService: SearchService,
    private tilesetService: TilesetService,
    private BoundaryService: BoundaryService,
    private SharedStateService: SharedStateService,
    private landMarkService: LandmarksService,
    private configService: ConfigService
  ) {
    this.clickSubscriptions = [];
  }

  initializeMap(container: string, popupDiv: HTMLElement) {
    this.popupDiv = popupDiv;
    this.map = new mapboxgl.Map({
      container: container,
      accessToken: environment.AccessToken,
      style: BASE_STYLE_URL,
      zoom: DEFAULT_ZOOM,
      projection: { name: 'globe' },
    });

    this.map.on('load', () => {
      this.mapLoaded.next(true);

      this.map.addControl(
        new mapboxgl.NavigationControl({ showCompass: false }),
        'bottom-right'
      );
      this.backendService.getDefaultReport().subscribe((result) => {
        this.SharedStateService.emitReportType(result.data);
      });
    });
  }

  // Function to add zoom subscription
  MapSubscription() {
    this.HookZoomEvent();
    this.ReportSubscription();
    this.addRasterLayerSub();
    this.addTilesetSub();
    this.addEsurveySub();
  }

  // This exposes zoom to map component so it can be used in other components
  HookZoomEvent() {
    fromEvent(this.map, 'zoom')
      .pipe(
        map(() => this.map.getZoom()),
        tap((zoom) => {
          if (!this.landmarksLoaded && zoom > 7) {
            this.landMarkService.getLandmarks(this.map);
            this.landmarksLoaded = true;
          }
        })
      )
      .subscribe((zoom) => this.zoomLevelSubject.next(zoom));
  }

  // Acts as entry point with the layer toggle functionality
  // TODO : Add consistency to these checks
  HandleTilesetVisbility(tileset: Tileset) {
    // if source does not exist then return
    if (!this.map.getSource(tileset.name)) {
      return;
    }
    // FIX : this name detection needs either an alternative or better handling in code for consistency
    // if tilset is Esurvey then disable onCick and hover for other tilesets
    if (tileset.name.toLowerCase().includes('esurvey')) {
      this.SharedStateService.changeEsurveyVisibility(tileset.visible);
    }

    // case for the points type source
    if (tileset.name.toLowerCase().includes('points')) {
      this.tilesetService.toggleTileset(tileset, this.map);
      this.SharedStateService.changeEsurveyVisibility(tileset.visible);

      return;
    }

    this.tilesetService.toggleTileset(tileset, this.map);
  }

  HandleTilesetColor(tileset:Tileset){
    this.tilesetService.changeTilesetColor(tileset,this.map);
  }

  HandleOrderdTilesets(tileset: Tileset[]) {
    console.log(tileset)
  }

  toggleImagery() {
    this.tilesetService.toggleTileset(this.rasterTileset.value, this.map);
  }
  // fetches configs from backend for the user
  fetchZoomLevels() {
    return this.backendService.getZoomLevels();
  }

  // Stream subscriptions that handle change
  addRasterLayerSub() {
    this.rasterTileset$
      .pipe(
        startWith<Tileset>(),
        pairwise(),
        filter(
          ([prevRasterTileset, currentRasterTileset]) =>
            currentRasterTileset.name !== '' &&
            currentRasterTileset.name !== undefined
        ) // filter out empty raster ids
      )
      .subscribe(([prevRasterTileset, currentRasterTileset]) => {
        this.tilesetService.UpdateRaster(
          currentRasterTileset,
          this.map,
          prevRasterTileset
        );
      });
  }

  addEsurveySub() {
    this.eSurveyTileset$
      .pipe(
        startWith(''),
        pairwise(),
        distinctUntilChanged(),
        filter(([prevTilesetId, currentTilesetId]) => currentTilesetId !== '')
      )
      .subscribe(([prevTilesetId, currentTilesetId]) => {
        this.tilesetService.removeTileset(prevTilesetId as Tileset, this.map);
        this.tilesetService.addTileset(
          currentTilesetId as Tileset,
          this.map,
          this.popupDiv!
        );
      });
  }

  ReportSubscription() {
    this.SharedStateService.ReportType$.pipe(
      tap(() => {
        this.SharedStateService.TableEmissions = false;
      }),
      switchMap((report: string) => this.backendService.getLatestReport(report))
    ).subscribe((data) => {
      this.updateMapData(data);
    });
  }

  updateMapForNewCrop(crop: string) {
    this.updateMapForNewFilter('crop', crop);
  }

  updateMapForNewSeason(season: string) {
    this.updateMapForNewFilter('season', season);
  }

  updateMapForNewDate(date: string, isDateChange?:boolean) {
    this.updateMapForNewFilter('date', date,isDateChange);
  }
  private updateMapForNewFilter(filterType: string, filterValue: string,isDateChange?:boolean) {
    this.SharedStateService.TableEmissions = false;

    const report = this.SharedStateService.getReportTypeValue();
    const season = this.SharedStateService.getCurrentSeasonValue();
    const crop = this.SharedStateService.getCurrentCropValue();

    let observable;

    switch (filterType) {
      case 'date':
        observable = this.backendService.getReportByDate(
          report,
          season,
          filterValue,
          crop
        );
        break;
      case 'season':
        observable = this.backendService.getLatestReportForSeason(
          filterValue,
          report
        );
        break;
      case 'crop':
        observable = this.backendService.getLatestReportForCrop(
          filterValue,
          report
        );
        break;
      default:
        observable = this.backendService.getLatestReport(report);
    }

    observable.subscribe((data) => {
      this.updateMapData(data, isDateChange);
    });
  }

  private updateMapData(data: any, isDateChange?:boolean) {
    this.SharedStateService.updateLoader(false);
    this.mapResize();
    const latestReport = data.latestReport;
    if(!isDateChange){
    if (latestReport?.user_centroid?.length) {
      this.map.setCenter(latestReport.user_centroid[0]);
      this.userCentroid(latestReport.user_centroid);
    } else {
      this.map.setCenter(this.PAK_CENTER);
    }
  }
    if (latestReport?.raster_id !== '') {
      this.rasterTileset.next({
        ...this.rasterTileset.value,
        name: latestReport?.raster_id,
        visible: true,
      });
    } else {
      this.tilesetService.RemoveRaster(this.rasterTileset.value, this.map);
    }

    this.currentTilesets.next(
      this.tilesetService.initializeTilesets(latestReport.tileset_ids)
    );
    this.SharedStateService.updateCurrentSeason(latestReport.report_season);
    this.SharedStateService.updateCurrentDate(latestReport.report_date);
    this.SharedStateService.updateCurrentCrop(latestReport.crop_type_name);
    //this.BoundaryService.getAoiAndStoreCenter()
    if (latestReport.esurvey_id != '') {
      this.eSurveyTileset.next({
        ...this.eSurveyTileset.value,
        name: latestReport.esurvey_id,
        visible: true,
      });
      this.SharedStateService.changeEsurveyVisibility(true);
    } else {
      this.eSurveyTileset.next({
        ...this.eSurveyTileset.value,
        name: '',
        visible: false,
      });
      this.tilesetService.removeTileset(this.eSurveyTileset.value, this.map);
      this.SharedStateService.changeEsurveyVisibility(false);
    }

    this.updateBoundariesOnChange();
    this.SharedStateService.TableEmissions = true;
  }

  updateBoundariesOnChange() {
    const currentBoundarySource =
      this.SharedStateService.currentBoundarySource.getValue();
    this.BoundaryService.updateSourceBoundaries(DEFAULT_ZOOM, this.map);
    //find the zoom level for the current boundary source
    // match currentLevel in find function
    const zoomLevelAction = this.configService.zoomLevels.find(
      ({ currentLevel }) => {
        return currentLevel == currentBoundarySource;
      }
    );

    zoomLevelAction!.add();
  }

  addTilesetSub() {
    this.currentTilesets$
      .pipe(
        startWith<Tileset[]>(),
        pairwise(), // get previous and current tilesetIds
        // filter if empty
        filter(
          ([prevTilesetId, currentTilesetId]) => currentTilesetId.length > 0
        )
      )
      .subscribe(([prevTilesets, currentTilesets]) => {
        this.tilesetService.removeTilesets(prevTilesets as Tileset[], this.map);
        this.tilesetService.addTilesets(
          currentTilesets as Tileset[],
          this.map,
          this.popupDiv!
        );
      });
  }

  async configureGeojsonSource(source: string, zoom: number) {
    await this.BoundaryService.configureGeojsonSource(
      source,
      this.map,
      zoom,
      this.popupDiv!
    );
  }

  // start refactor here
  hideBoundaryLayer(source: string) {
    this.BoundaryService.hideBoundaryLayer(source, this.map);
  }

  searchQuery(searchOption: string, query: string) {
    this.searchService.searchQuery(
      searchOption,
      query,
      this.map,
      this.eSurveyTileset.value.name
    );
  }

  resetSearchZoom(searchOption: string) {
    const center = this.BoundaryService.getClientCenter();
    console.log(center);
    this.searchService.resetSearchZoom(
      searchOption,
      this.map,
      this.BoundaryService.getClientCenter()
    );
  }

  flyto(lng: number, lat: number, zoom: number) {
    this.map.flyTo({
      center: [lng, lat],
      zoom: zoom,
      essential: true,
    });
  }

  // This function resets viewports to the Esurvey zoom level
  // so the search is valid
  setEsurveyZoom() {
    this.map.flyTo({
      center: this.BoundaryService.getClientCenter(),
      zoom: Esurvey_ZOOM,
    });
  }

  //clean up subscriptions
  cleanUp() {
    this.clickSubscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnDestroy() {
    this.cleanUp();
  }

  takeUserToAoi() {
    this.BoundaryService.flyToClientCenter(this.map);
  }

  mapResize() {
    of(null)
      .pipe(delay(0))
      .subscribe(() => {
        this.map.resize();
      });
  }

  userCentroid(centroid: [{ lat: number; lng: number }] | []) {
    this.clearMarkers();

    centroid?.forEach((res) => {
      const el = document.createElement('div');
      el.className = 'marker';
      const marker = new mapboxgl.Marker(el).setLngLat(res).addTo(this.map);
      marker.getElement().addEventListener('click', (e) => {
        e.stopPropagation();
        this.flyto(res.lng, res.lat, 8);
      });

      this.markers.push(marker);
    });
  }

  clearMarkers() {
    this.markers.forEach(marker => marker.remove());
    this.markers = [];
  }
}
