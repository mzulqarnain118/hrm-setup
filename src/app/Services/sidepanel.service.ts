import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  EMPTY,
  Observable,
  Subject,
  catchError,
  combineLatest,
  finalize,
  repeat,
  tap,
  throwError,
} from 'rxjs';
import { MapService } from './map.service';
import { DEFAULT_REPORT } from 'src/assets/constants/constants';
import { SharedStateService } from './shared-state.service';
@Injectable({
  providedIn: 'root',
})
export class SidepanelService {
  /* This exposes the reportTypeSubject as an observable 
   this observable is to be used by the sibling components as injecting into map component is not possible due to circular DI */

  // TODO: Find a better way to communicate to map service => mediator pattern maybe ?
  ReportType = new Subject<string>();
  ReportType$ = this.ReportType.asObservable();

  PanelData = new BehaviorSubject<string[]>([]);
  PanelData$ = this.PanelData.asObservable();

  currentBoundarySource$ = new Observable<string>();

  clickedBoundaryId$ = new Observable<string>();
  clickedBoundaryName$ = new Observable<string>();

  combinedData$: Observable<[string, string, string, string,string]>;

  // Service to Service communication
  constructor(
    private MapService: MapService,
    private SharedStateService: SharedStateService
  ) {
    // // Updating map service with reportType
    // this.ReportType$.subscribe((reportType) => {
    //   this.SharedStateService.updateReportType(reportType);
    // });

    // this.ReportType$ = this.SharedStateService.ReportType$;
    this.ReportType$ = this.SharedStateService.ReportType$;
    this.clickedBoundaryName$ = this.SharedStateService.clickedBoundaryName$;
    this.currentBoundarySource$ =
      this.SharedStateService.currentBoundarySource$;
    this.clickedBoundaryId$ = this.SharedStateService.clickedBoundaryId$;

    this.combinedData$ = combineLatest([
      this.SharedStateService.currentCrop$,
      this.ReportType$,
      this.SharedStateService.currentSeason$,
      this.SharedStateService.currentDate$,
      this.SharedStateService.currentBoundarySource$,
    ]);

    this.clickedBoundaryId$.subscribe();
    this.combinedData$.subscribe();
  }

  // UpdateReportType(reportType: string) {
  //   this.ReportType.next(reportType);
  // }

  // getReportType(): string {
  //   return this.ReportType.value;
  // }
}
