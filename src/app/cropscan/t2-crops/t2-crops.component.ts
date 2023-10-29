import { Component } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  debounceTime,
  filter,
  map,
  switchMap,
} from 'rxjs';
emoizationService } from 'src/app/_Services/Memoization/memoization.service';
import { ApiService } from 'src/app/_Services/api.service';
import { SharedStateService } from 'src/app/_Services/shared-state.service';
import { SidepanelService } from 'src/app/_Services/sidepanel.service';
import { colorMap } from 'src/assets/constants/colors';
import { AddCommasPipe } from '../../_Pipes/add-commas.pipe';
import { AsyncPipe, KeyValuePipe } from '@angular/common';

@Component({
    selector: 'app-t2-crops',
    templateUrl: './t2-crops.component.html',
    styleUrls: ['./t2-crops.component.scss'],
    standalone: true,
    imports: [
        AsyncPipe,
        KeyValuePipe,
        AddCommasPipe,
    ],
})
export class T2CropsComponent {
  clickedBoundaryId$ = new Observable<string>();
  clickBoundaryName$ = new Observable<string>();

  combinedObservableForT2$: Observable<any>;
  data = new BehaviorSubject<Object>({});
  data$ = this.data.asObservable();

  constructor(
    private SidePanelService: SidepanelService,
    private apiService: ApiService,
    private sharedStateService: SharedStateService,
    private memoizationService: MemoizationService
  ) {
    this.clickBoundaryName$ = this.SidePanelService.clickedBoundaryName$;
    this.clickedBoundaryId$ = this.SidePanelService.clickedBoundaryId$.pipe();

multiple emissions. Need to fix
