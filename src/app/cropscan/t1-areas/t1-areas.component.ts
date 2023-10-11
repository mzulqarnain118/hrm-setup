import {
  ChangeDetectorRef,
  Component,
  HostListener,
  inject,
} from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
} from 'rxjs';
import { ApiService } from 'src/app/_Services/api.service';
import { SharedStateService } from 'src/app/_Services/shared-state.service';
import { SidepanelService } from 'src/app/_Services/sidepanel.service';
import { toPascalCase } from 'src/app/_utils/toPascalNotation';
import { MemoizationService } from '../../_Services/Memoization/memoization.service'; // Assuming you have a memoization utility
import { RoleService } from 'src/app/_Services/roles.service';
import { AddCommasPipe } from '../../_Pipes/add-commas.pipe';
import { AsyncPipe } from '@angular/common';

interface BoundaryData {
  'Boundary Name': string;
  'Crop Area': string;
  'Esurvey Area': string;
}

@Component({
    selector: 'app-t1-areas',
    templateUrl: './t1-areas.component.html',
    styleUrls: ['./t1-areas.component.scss'],
    standalone: true,
    imports: [AsyncPipe, AddCommasPipe],
})
export class T1AreasComponent {
  protected sharedService = inject(SharedStateService);
  private memoizationService = inject(MemoizationService);
  protected toPascalNotation = toPascalCase;
  combinedData$: Observable<[string, string, string, string, string]>;
  limit: number = 10;
  offset: number = 0;
  data = new BehaviorSubject<BoundaryData[]>([]);
  data$ = this.data.asObservable();

  keysOrder: string[];
  prevScrollPosition: number = 0;
  maxCount: number = 0;
me$ = new Observable<string>();
  reportType: string;
  season: string;
  reportDate: string;
  currentBoundary: string;
  boundrayName: string;
  key: string;
  crop: string;
  getValue(object: any, key: string): any {
    return object?.[key];
  }

  constructor(
    private SidepanelService: SidepanelService,
    private apiService: ApiService,
    private roleService: RoleService,
    private cdr: ChangeDetectorRef,
  ) {
    this.clickBoundaryName$ = this.SidepanelService.clickedBoundaryName$;
    this.combinedData$ = this.SidepanelService.combinedData$;
    this.combinedData$
      .pipe(
        filter((res) => res.every((element) => element !== '')),
        debounceTime(300),
        switchMap((res) => {
          const [crop, reportType, season, reportDate, currentBoundary] = res;
          this.crop = crop;
          this.reportType = reportType;
          this.season = season;
          this.reportDate = reportDate;
          this.currentBoundary = currentBoundary;
          this.offset = 0;

          this.lastBoundaryName = currentBoundary;

          this.key = JSON.stringify({
            crop: this.crop,
            reportType: this.reportType,
            season: this.season,
            reportDate: this.reportDate,
            currentBoundary: this.currentBoundary,
            limit: this.limit,
            offset: this.offset,
          });

          const memoizedObservable = this.memoizationService.memoize(
            this.key,
            this.apiService.getT1Data(
              crop,
              this.reportType,
rtDate,
              this.currentBoundary,
              this.limit,
              this.offset,
            ),
          );

          return memoizedObservable;
        }),
        filter((res) => !!res), // This line can be adjusted or removed based on your needs
      )
      .subscribe((res) => {
        this.data.next(res.data);
        this.maxCount = res.total;
        this.cdr.detectChanges();
this.clickBoundaryName$
      .pipe(filter((boundaryName) => boundaryName != ''))
      .subscribe((boundaryName) => {
        // Get the current data array
        const currentData = this.data.getValue();
        this.boundrayName = boundaryName;
        // Find the index of the boundary in the data array
        const boundaryIndex = currentData.findIndex(
          (item) => item['Boundary Name'] === boundaryName,
        );

        if (boundaryIndex > -1) {
          const boundaryObj = currentData[boundaryIndex];
          currentData.splice(boundaryIndex, 1);
          currentData.unshift(boundaryObj);
          this.data.next(currentData);
        } else if (this.boundrayName) {
          this.key = JSON.stringify({
            reportType: this.reportType,
            season: this.season,
            reportDate: this.reportDate,
            currentBoundary: this.currentBoundary,
            limit: this.limit,
            offset: this.offset,
            boundrayName: this.boundrayName,
          });
          this.loadData();
        }
      });
    this.checkEsurvey();
  }

  @HostListener('scroll', ['$event'])
  onElementScroll($event: any) {
    const scrollPosition = $event.target.scrollTop;
s.prevScrollPosition &&
      this.data.getValue().length < this.maxCount
    ) {
      this.boundrayName = '';
      this.offset += 1;

      this.key = JSON.stringify({
        reportType: this.reportType,
        season: this.season,
        reportDate: this.reportDate,
        currentBoundary: this.currentBoundary,
        limit: this.limit,
        offset: this.offset,
        boundrayName: this.boundrayName,
      });
      this.loadData();
    }

    this.prevScrollPosition = scrollPosition;
  }

  private loadData() {
    this.memoizationService
      .memoize(
        this.key,
        this.apiService.getT1Data(
          this.crop,
          this.reportType,
          this.season,
          this.reportDate,
          this.currentBoundary,
          this.limit,
          this.offset,
          this.boundrayName,
        ),
      )
      .pipe(
        map((newData) => newData.data),
        distinctUntilChanged(),
      )
      .subscribe(async (newData) => {
        const currentData = this.data.getValue();
        const updatedData = [...newData, ...currentData];
        const uniqueData = updatedData.reduce((accumulator, currentObj) => {
          const existingObj = accumulator.find(
            (obj: { id: any }) => obj.id === currentObj.id,
          );

          if (!existingObj) {
   }

          return accumulator;
        }, []);
        this.data.next(uniqueData);
        if (this.boundrayName) await this.reload();
        this.cdr.detectChanges();
      });
  }

  private reload() {
    this.clickBoundaryName$
      .pipe(filter((boundaryName) => boundaryName != ''))
      .subscribe((boundaryName) => {
        const currentData = this.data.getValue();
        this.boundrayName = boundaryName;
        const boundaryIndex = currentData.findIndex(
          (item) => item['Boundary Name'] === boundaryName,
        );

        if (boundaryIndex > -1) {
          const boundaryObj = currentData[boundaryIndex];
          currentData.splice(boundaryIndex, 1);
          currentData.unshift(boundaryObj);
          this.data.next(currentData);
        }
      });
  }

  checkEsurvey() {
    this.roleService.isEsurvey().subscribe((res) => {
      this.keysOrder = res
        ? ['Boundary Name', 'Crop Area', 'Esurvey Area']
        : ['Boundary Name', 'Crop Area'];
    });
  }

  ngAfterViewInit() {}
}
import {
  ChangeDetectorRef,
  Component,
  HostListener,
  inject,
} from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
} from 'rxjs';
import { ApiService } from 'src/app/_Services/api.service';
import { SharedStateService } from 'src/app/_Services/shared-state.service';
import { SidepanelService } from 'src/app/_Services/sidepanel.service';
import { toPascalCase } from 'src/app/_utils/toPascalNotation';
import { MemoizationService } from '../../_Services/Memoization/memoization.service'; // Assuming you have a memoization utility
import { RoleService } from 'src/app/_Services/roles.service';
import { AddCommasPipe } from '../../_Pipes/add-commas.pipe';
import { AsyncPipe } from '@angular/common';

interface BoundaryData {
  'Boundary Name': string;
  'Crop Area': string;
  'Esurvey Area': string;
}

@Component({
    selector: 'app-t1-areas',
    templateUrl: './t1-areas.component.html',
    styleUrls: ['./t1-areas.component.scss'],
    standalone: true,
    imports: [AsyncPipe, AddCommasPipe],
})
export class T1AreasComponent {
  protected sharedService = inject(SharedStateService);
  private memoizationService = inject(MemoizationService);
  protected toPascalNotation = toPascalCase;
ng, string, string, string]>;
  limit: number = 10;
  offset: number = 0;
  data = new BehaviorSubject<BoundaryData[]>([]);
  data$ = this.data.asObservable();

  keysOrder: string[];
  prevScrollPosition: number = 0;
  maxCount: number = 0;
  lastBoundaryName: string = '';
  clickBoundaryName$ = new Observable<string>();
  reportType: string;
  season: string;
  reportDate: string;
  currentBoundary: string;
  boundrayName: string;
 crop: string;
  getValue(object: any, key: string): any {
    return object?.[key];


  constructor(
    private SidepanelService: SidepanelService,
    private apiService: ApiService,
    private roleService: RoleService,
    private cdr: ChangeDetectorRef,
  ) {
    this.clickBoundaryName$ = this.SidepanelService.clickedBoundaryName$;
    this.combinedData$ = this.SidepanelService.combinedData$;
    this.combinedData$
      .pipe(
        filter((res) => res.every((element) => element !== '')),
        debounceTime(300),
        switchMap((res) => {
          const [crop, reportType, season, reportDate, currentBoundary] = res;
          this.crop = crop;
          this.reportType = reportType;
          this.season = season;
          this.reportDate = reportDate;
          this.currentBoundary = currentBoundary;
          this.offset = 0;

          this.lastBoundaryName = currentBoundary;
ON.stringify({
            crop: this.crop,
            reportType: this.reportType,
            season: this.season,
            reportDate: this.reportDate,
            currentBoundary: this.currentBoundary,
            limit: this.limit,
            offset: this.offset,
          });

          const memoizedObservable = this.memoizationService.memoize(
            this.key,
            this.apiService.getT1Data(
              crop,
              this.reportType,
              this.season,
              this.reportDate,
              this.currentBoundary,
              this.limit,
              this.offset,
            ),
          );

          return memoizedObservable;
        }),
        filter((res) => !!res), // This line can be adjusted or removed based on your needs
      )
      .subscribe((res) => {
        this.data.next(res.data);
        this.maxCount = res.total;
        this.cdr.detectChanges();
      });

    this.clickBoundaryName$
      .pipe(filter((boundaryName) => boundaryName != ''))
      .subscribe((boundaryName) => {
        // Get the current data array
        const currentData = this.data.getValue();
        this.boundrayName = boundaryName;
        // Find the index of the boundary in the data array
        const boundaryIndex = currentData.findIndex(
          (item) => item['Boundary Name'] === boundaryName,
        );

        if (boundaryIndex > -1) {
          const boundaryObj = currentData[boundaryIndex];
;
