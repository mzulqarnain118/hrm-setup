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
