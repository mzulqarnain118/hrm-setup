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
  onElementScroll($event: any) {
    const scrollPosition = $event.target.scrollTop;
    if (
      scrollPosition > this.prevScrollPosition &&
      this.unFilteredData?.length < this.maxCount
    ) {
his.offset += 1;
      this.loadData();
    }

    this.prevScrollPosition = scrollPosition;
  }

  private loadData() {
.apiService
      .getT3Data(
        this.crop,
        this.reportType,
        this.season,
        this.reportDate,
        this.currentBoundary,
        this.limit,
        this.offset
      )
      .subscribe((apiResponse) => {
        //todo: this needs to be update in the BE
        this.unFilteredData = [...this.unFilteredData, ...apiResponse.data];
        const filteredData = apiResponse.data?.filter(
          (res: any) => res.series[0].value != 0
        );
        this.multi = [...this.multi, ...filteredData];
        this.maxCount = apiResponse.total;
        this.cdr.detectChanges();
      });
  }

  ngAfterViewInit() {}
  heightMultiplyingConstant = 350;
  view: [number, number] = [
    230,
    this.multi.length * this.heightMultiplyingConstant,
  ];

  getChartHeight(): string {
    return `${this.multi.length * 2.3}vh`;
  }

  showXAxis: boolean = false;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = false;
  showXAxisLabel: boolean = false;
  yAxisLabel: string = 'Country';
  showYAxisLabel: boolean = false;

  // paint params
  colorMap = colorMap;
import {
