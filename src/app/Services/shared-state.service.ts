import { Injectable } from '@angular/core';
import { NavigationEnd, ResolveEnd, Router } from '@angular/router';
import {
  BehaviorSubject,
  ReplaySubject,
  Subject,
  distinctUntilChanged,
  filter,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedStateService {
  public isEsurveyVisible: boolean;
  public combinedTilesetNames: string = '';

  public TableEmissions: boolean = true;
  private clickedBoundaryId = new BehaviorSubject<string>('1');
  clickedBoundaryId$ = this.clickedBoundaryId
    .asObservable()
    .pipe(distinctUntilChanged());

  private clickedBoundaryName = new BehaviorSubject<string>('');
  clickedBoundaryName$ = this.clickedBoundaryName.asObservable().pipe();

  private currentSeason = new BehaviorSubject<string>('');
  currentSeason$ = this.currentSeason.asObservable().pipe();

  private usernameSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  usernameObservable = this.usernameSubject.asObservable();

  public loaderSubject = new BehaviorSubject<boolean>(true);
  loader$ = this.loaderSubject.asObservable();
orSubject<boolean>(false);
  isDialogOpen$ = this.isDialogOpen.asObservable();

  table2data = new BehaviorSubject<Object>({});
  table2data$ = this.table2data.asObservable();

  public menu = new BehaviorSubject<string>('dashboard');
  menu$ = this.menu.asObservable();

  private ReportTypeSubject = new Subject<string>();
  ReportType$ = this.ReportTypeSubject.asObservable();

  private currentReport: string = '';
  private currentDate = new BehaviorSubject<string>('');
  currentDate$ = this.currentDate.asObservable().pipe();

  private isCollapse = new BehaviorSubject<boolean>(false);
  isCollapse$ = this.isCollapse.asObservable().pipe();
  // fix these
  currentCropName: string = '';
  private currentCrop = new ReplaySubject<string>(1);
  currentCrop$ = this.currentCrop.asObservable();

  currentBoundarySource = new BehaviorSubject<string>('aoi');
 = this.currentBoundarySource
    .asObservable()
    .pipe(distinctUntilChanged());

nstructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((res: any) => {
        this.updateMenu(res['url'].split('/')[1]);
      });

    this.isEsurveyVisible = false;
    this.ReportType$.subscribe((reportType) => {
s.currentReport = reportType;
    });
    this.currentCrop$.subscribe((crop) => {
      this.currentCropName = crop;
    });
  }

  changeEsurveyVisibility(bool: boolean) {
    this.isEsurveyVisible = bool;
  }

  updatedCombinedTilesetNames(names: string) {
    this.combinedTilesetNames = names;
  }

  updateClickedBoundaryId(id: string) {
    this.clickedBoundaryId?.next(id);
  }
  updateClickedBoundaryName(name: string) {
    this.clickedBoundaryName.next(name);
  }
  updateCurrentSeason(season: string) {
    this.currentSeason.next(season);
  }
  updateCurrentDate(date: string) {
    this.currentDate.next(date);
  }
  updateCurrentCrop(crop: string) {
    this.currentCrop.next(crop);
  }
  updateIsDialogOpen(dialog: boolean) {
    this.isDialogOpen.next(dialog);
  }
  // Function to update the value of zoom level
  // So the other services dont update value directly
  updateCurrentBoundary(newZoomLevel: string) {
newZoomLevel);
  }

  updateUsername(username: string) {
    this.usernameSubject.next(username);
  }

edIsCollapse(collapse: boolean) {
    this.isCollapse.next(collapse);
  }

  updateTable2Data(data: any) {
    this.table2data.next(data);
  }

  getCurrentSeasonValue() {
    return this.currentSeason.getValue();
  }
  getCurrentCropValue() {
    return this.currentCropName;
  }
  getClickedBoundaryIdValue() {
    return this.clickedBoundaryId.getValue();
  }
  getClickedBoundaryNameValue() {
    return this.clickedBoundaryName.getValue();
  }
() {
    return this.currentReport;
  }

  getCurrentDateValue() {
    return this.currentDate.value.split('T')[0];
  }

  emitReportType(reportType: string) {
    this.ReportTypeSubject.next(reportType);
  }

  updateMenu(menu: string) {
    this.menu.next(menu);
  }

  updateLoader(value: boolean) {
    this.loaderSubject.next(value);
  }
}
