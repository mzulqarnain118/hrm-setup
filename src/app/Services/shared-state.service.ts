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
