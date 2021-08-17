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
