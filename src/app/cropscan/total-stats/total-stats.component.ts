import { Component } from '@angular/core';
import { Subject, combineLatest, filter, map, switchMap } from 'rxjs';
import { ApiService } from 'src/app/_Services/api.service';
import { SharedStateService } from 'src/app/_Services/shared-state.service';
import { AddCommasPipe } from '../../_Pipes/add-commas.pipe';
import { NgClass, AsyncPipe, KeyValuePipe } from '@angular/common';

export interface TotalStatsData {}
nt({
    selector: 'app-total-stats',
    templateUrl: './total-stats.component.html',
    styleUrls: ['./total-stats.component.scss'],
    standalone: true,
    imports: [
        NgClass,
        AsyncPipe,
        KeyValuePipe,
        AddCommasPipe,
    ],
})
export class TotalStatsComponent {
  private data = new Subject<any>();
  data$ = this.data.asObservable();

  constructor(
    private apiService: ApiService,
    private sharedStateService: SharedStateService
  ) {
    //this.data$ = this.apiService.getTotalStats().pipe(map((res) => res.data));

    combineLatest([
      this.sharedStateService.currentSeason$,
      this.sharedStateService.currentCrop$,
    ])
      .pipe(
        filter(([season, crop]) => season !== '' && crop !== ''), // Adjust the condition based on your requirements
        switchMap(([season, crop]) =>
          this.apiService.getTotalStats(crop, season)
        )
      )
      .subscribe((res) => {
        this.data.next(res.data);
      });
  }

  handleClick(data: any) {
    if (this.isClickable(data.key)) {
      console.log(data, 'clicked');
      // window.open('https://survey.portal.farmdar.pk/', '_blank');
    }
  }
== 'Total Esurvey' || key === 'Total Growers';
  }
}
