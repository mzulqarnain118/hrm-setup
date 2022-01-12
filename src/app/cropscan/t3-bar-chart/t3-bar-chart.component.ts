import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
} from '@angular/core';
import { Component, ViewChild, HostListener } from '@angular/core';
import { BarHorizontalNormalizedComponent, BarChartModule } from '@swimlane/ngx-charts';
import { debounceTime, filter, switchMap } from 'rxjs/operators';
import { MemoizationService } from 'src/app/_Services/Memoization/memoization.service';
import { ApiService } from 'src/app/_Services/api.service';
import { SharedStateService } from 'src/app/_Services/shared-state.service';
import { SidepanelService } from 'src/app/_Services/sidepanel.service';
import { colorMap } from 'src/assets/constants/colors';

@Component({
    selector: 'app-t3-bar-chart',
    templateUrl: './t3-bar-chart.component.html',
    styleUrls: ['./t3-bar-chart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [BarChartModule],
})
export class T3BarChartComponent implements OnInit {
  isDataAvailable: boolean = false;
  @ViewChild('chart') chart: BarHorizontalNormalizedComponent;
  multi: any[] = [];

  limit: number = 15;
  offset: number = 0;
  reportType: string;
  season: string;
  reportDate: string;
  currentBoundary: string;
  crop: string;
  prevScrollPosition: number = 0;
  maxCount: number = 0;
  unFilteredData: any[] = [];
  constructor(
    private sidepanelService: SidepanelService,
    private apiService: ApiService,
    private sharedStateService: SharedStateService,
rivate memoizationService: MemoizationService
  ) {}

  ngOnInit(): void {
    this.sidepanelService.combinedData$
      .pipe(
        debounceTime(100),
 filter((res) => res.every((element) => element !== '')),
        filter(() => this.sharedStateService.TableEmissions),
        switchMap((res) => {
          const [crop,reportType, season, reportDate, currentBoundary] = res;
          this.crop=crop;
          this.reportType = reportType;
          this.season = season;
          this.reportDate = reportDate;
          this.currentBoundary = currentBoundary;
          this.offset = 0;

          const key = JSON.stringify({
            crop,
            season,
            currentBoundary,
            reportType,
            reportDate,
          });

          return this.memoizationService.memoize(
Use the generated key for memoization
            this.apiService.getT3Data(
              crop,
              reportType,
              season,
              reportDate,
              currentBoundary,
              this.limit,
              this.offset
            )
          );
        })
      )
      .subscribe((apiResponse) => {
        //todo: this needs to be update in the BE
        const filteredData = apiResponse.data?.filter(
          (res: any) => res.series[0].value != 0
        );
        this.multi = filteredData;
        this.unFilteredData = apiResponse.data;
        this.maxCount = apiResponse.total;
        this.isDataAvailable = true;
        this.cdr.detectChanges();
      });
  }
, ['$event'])
