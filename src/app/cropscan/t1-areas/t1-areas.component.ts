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
