import { Component } from '@angular/core';
import {
  Observable,
  combineLatest,
  distinctUntilChanged,
  map,
  of,
  shareReplay,
  takeLast,
  tap,
} from 'rxjs';
import { ApiService } from 'src/app/_Services/api.service';
import { MapService } from 'src/app/_Services/map.service';
import { SharedStateService } from 'src/app/_Services/shared-state.service';
import { SidepanelService } from 'src/app/_Services/sidepanel.service';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface DropdownData {}

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss'],
    standalone: true,
    imports: [FormsModule, AsyncPipe],
mponent {
  // Selected value
  currentSeason$ = new Observable<string>();
  currentDate$ = new Observable<string>();
  currentCrop$ = new Observable<string>();

  // Options from backend
  seasonsOptions$ = new Observable<string[]>();
  cropOptions$ = new Observable<string[]>();
  dateOptions$ = new Observable<string[]>();

  combinedObservables$ = new Observable<string[]>();

  constructor(
    private apiService: ApiService,
    private mapService: MapService,
    private sidePanelService: SidepanelService,
    private sharedStateService: SharedStateService
  ) {}

  ngOnInit(): void {
t();

    this.combinedObservables$ = combineLatest([
      this.currentCrop$.pipe(distinctUntilChanged()),
      this.currentSeason$.pipe(distinctUntilChanged()),
      this.sidePanelService.ReportType$,
    ]);

    this.combinedObservables$.pipe().subscribe((res) => {
      // array destructuring
      const [currentCrop, currentSeason, reportType] = res;
      this.cropOptions$ = this.apiService
        .getAllCrops(reportType)
        .pipe(map((res) => res.data));
      this.dateOptions$ = this.apiService
        .getAllDates(currentCrop, currentSeason, reportType)
        .pipe(map((res) => res.data));
    });

    this.sharedStateService.currentCrop$
      .pipe(
        tap(
          (data) =>
            (this.seasonsOptions$ = this.apiService
              .getAllSeasons(data, this.sharedStateService.getReportTypeValue())
              .pipe(map((res) => res.data)))
ubscribe();
  }

  // Function to handle the selection
  onSeasonSelect(event: Event) {
    const elem = event.target as HTMLSelectElement;
    const selectedSeason = elem.value.split(':')[1].trim();

    this.mapService.updateMapForNewSeason(selectedSeason);
  }

  onCropSelect(event: Event) {
    const elem = event.target as HTMLSelectElement;
    const selectedCrop = elem.value.split(':')[1].trim();

    this.mapService.updateMapForNewCrop(selectedCrop);
  }

  onDateSelect(event: any) {
ent.target as HTMLSelectElement;
    const selectedDate = elem.value;
    console.log('selected date ', selectedDate);
    // send call to update the map
    this.mapService.updateMapForNewDate(selectedDate,true);
  }

  defaultReport() {
    this.currentCrop$ = this.sharedStateService.currentCrop$;
    this.currentSeason$ = this.sharedStateService.currentSeason$;
    this.currentDate$ = this.sharedStateService.currentDate$.pipe(
      map((res) => res.split('T')[0])
    );
  }
}
import { Component } from '@angular/core';
import {
  Observable,
  combineLatest,
  distinctUntilChanged,
  map,
  of,
  shareReplay,
  takeLast,
  tap,
} from 'rxjs';
import { ApiService } from 'src/app/_Services/api.service';
Service } from 'src/app/_Services/map.service';
import { SharedStateService } from 'src/app/_Services/shared-state.service';
import { SidepanelService } from 'src/app/_Services/sidepanel.service';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface DropdownData {}

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss'],
    standalone: true,
    imports: [FormsModule, AsyncPipe],
})
export class DropdownComponent {
  // Selected value
  currentSeason$ = new Observable<string>();
  currentDate$ = new Observable<string>();
  currentCrop$ = new Observable<string>();

  // Options from backend
  seasonsOptions$ = new Observable<string[]>();
  cropOptions$ = new Observable<string[]>();
  dateOptions$ = new Observable<string[]>();

  combinedObservables$ = new Observable<string[]>();

  constructor(
    private apiService: ApiService,
    private mapService: MapService,
    private sidePanelService: SidepanelService,
    private sharedStateService: SharedStateService
  ) {}

  ngOnInit(): void {
combinedObservables$ = combineLatest([
      this.currentCrop$.pipe(distinctUntilChanged()),
      this.currentSeason$.pipe(distinctUntilChanged()),
      this.sidePanelService.ReportType$,
    ]);

    this.combinedObservables$.pipe().subscribe((res) => {
      // array destructuring
      const [currentCrop, currentSeason, reportType] = res;
      this.cropOptions$ = this.apiService
        .getAllCrops(reportType)
        .pipe(map((res) => res.data));
      this.dateOptions$ = this.apiService
        .getAllDates(currentCrop, currentSeason, reportType)
        .pipe(map((res) => res.data));
    });

    this.sharedStateService.currentCrop$
      .pipe(
        tap(
          (data) =>
            (this.seasonsOptions$ = this.apiService
              .getAllSeasons(data, this.sharedStateService.getReportTypeValue())
              .pipe(map((res) => res.data)))
        )
      )
      .subscribe();
  }

  // Function to handle the selection
  onSeasonSelect(event: Event) {
    const elem = event.target as HTMLSelectElement;
    const selectedSeason = elem.value.split(':')[1].trim();

    this.mapService.updateMapForNewSeason(selectedSeason);
  }

  onCropSelect(event: Event) {
    const elem = event.target as HTMLSelectElement;
    const selectedCrop = elem.value.split(':')[1].trim();

    this.mapService.updateMapForNewCrop(selectedCrop);
  }

  onDateSelect(event: any) {
    const elem = event.target as HTMLSelectElement;
le.log('selected date ', selectedDate);
    // send call to update the map
    this.mapService.updateMapForNewDate(selectedDate,true);
  }

  defaultReport() {
    this.currentCrop$ = this.sharedStateService.currentCrop$;
    this.currentSeason$ = this.sharedStateService.currentSeason$;
    this.currentDate$ = this.sharedStateService.currentDate$.pipe(
      map((res) => res.split('T')[0])
    );
  }
}
import { Component } from '@angular/core';
import {
  Observable,
  combineLatest,
  distinctUntilChanged,
  map,
  of,
  shareReplay,
  takeLast,
  tap,
} from 'rxjs';
import { ApiService } from 'src/app/_Services/api.service';
import { MapService } from 'src/app/_Services/map.service';
import { SharedStateService } from 'src/app/_Services/shared-state.service';
import { SidepanelService } from 'src/app/_Services/sidepanel.service';
import { AsyncPipe } from '@angular/common';
dule } from '@angular/forms';

export interface DropdownData {}
omponent({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss'],
    standalone: true,
    imports: [FormsModule, AsyncPipe],
})
export class DropdownComponent {
  // Selected value
  currentSeason$ = new Observable<string>();
  currentDate$ = new Observable<string>();
  currentCrop$ = new Observable<string>();

  // Options from backend
  seasonsOptions$ = new Observable<string[]>();
  cropOptions$ = new Observable<string[]>();
  dateOptions$ = new Observable<string[]>();

  combinedObservables$ = new Observable<string[]>();

  constructor(
    private apiService: ApiService,
    private mapService: MapService,
    private sidePanelService: SidepanelService,
    private sharedStateService: SharedStateService
  ) {}

  ngOnInit(): void {
    this.defaultReport();

    this.combinedObservables$ = combineLatest([
      this.currentCrop$.pipe(distinctUntilChanged()),
      this.currentSeason$.pipe(distinctUntilChanged()),
      this.sidePanelService.ReportType$,
    ]);

    this.combinedObservables$.pipe().subscribe((res) => {
      // array destructuring
      const [currentCrop, currentSeason, reportType] = res;
      this.cropOptions$ = this.apiService
        .getAllCrops(reportType)
        .pipe(map((res) => res.data));
      this.dateOptions$ = this.apiService
        .getAllDates(currentCrop, currentSeason, reportType)
        .pipe(map((res) => res.data));
rop$
