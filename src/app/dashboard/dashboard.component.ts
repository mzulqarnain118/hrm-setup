import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../_Services/Dashboard/dashboard.service';
import { ApiService } from '../_Services/api.service';
import { RoleService } from '../_Services/roles.service';
import { SharedStateService } from '../_Services/shared-state.service';
import {
  eSurveyGraphTypes,
  totalAreaGraphTypes,
} from 'src/assets/constants/constants';
import { roles } from '../_Interfaces/dashboard';
import { AddCommasPipe } from '../_Pipes/add-commas.pipe';
import { WeatherForecastChartComponent } from './weather-forecast-chart/weather-forecast-chart.component';
import { HistoricalWeatherChartComponent } from './historical-weather-chart/historical-weather-chart.component';
import { ESurveyChartComponent } from './e-survey-chart/e-survey-chart.component';
import { AreaVsCropsChartComponent } from './area-vs-crops-chart/area-vs-crops-chart.component';
import { DropdownFilterComponent } from './dropdown-filter/dropdown-filter.component';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    standalone: true,
    imports: [
        NgClass,
        DropdownFilterComponent,
        AreaVsCropsChartComponent,
t,
        HistoricalWeatherChartComponent,
        WeatherForecastChartComponent,
        AddCommasPipe,
    ],
})
export class DashboardComponent implements OnInit {
: roles[];

  private apiService = inject(ApiService);
  protected dashboardService = inject(DashboardService);
  protected roleService = inject(RoleService);
  protected sharedService = inject(SharedStateService);
  private router = inject(Router);

  boxes = [
    {
      title: 'Total Grower Count',
      key: 'total_grower_count',
      count: '--',
      type: 'eSurvey',
      url: this.apiService.getRedirectionUrl(),
      product_name: 'ESurvey',
    },
    {
      title: 'Total Area',
      key: 'total_area',
      count: '--',
      type: 'eSurvey (Acres)',
      product_name: 'ESurvey',
    },
    {
      title: 'Main Crop Area',
      count: '--',
      type: 'Cropscan (Acres)',
      product_name: 'Cropscan',
    },
    {
      title: 'Other Crop Area',
      count: '--',
      type: 'L1 other crops',
      product_name: 'Cropscan',
    },
    {
      title: 'Uncultivated Land',
      count: '--',
    product_name: 'Arable Land',
    },
    {
      title: 'Expected Supply',
      count: '--',
      type: 'Yield estimation',
      product_name: 'Yield Estimation',
    },
    {
      title: 'Active Projects',
      count: '--',
      type: 'Developro',
      product_name: 'Developro',
    },
    {
      title: 'Active Employees',
      count: '--',
      type: 'Team Trak',
      product_name: 'Team Trak',
    },
  ];

  ngOnInit(): void {
    this.roleService.roles$.subscribe((res) => {
      this.roles=res;
      if (this.roleService.isAccess('eSurvey', this.roles)) {
        this.dashboardService.getEsurveyStats().subscribe((res) => {
          this.updateBoxCount('total_grower_count', res.total_grower_count);
          this.updateBoxCount('total_area', res.total_area);
        });
      }
    });
  }

  updateBoxCount(key: string, value: any): void {
x) => box.key === key);
    if (box) {
      box.count = value.toString(); // Assuming value is a number
    }
  }

  onClick(item: string, isAccess: boolean) {
    if (!isAccess) return;
    if (item === 'Main Crop Area') {
      this.router.navigateByUrl('/cropscan');
      this.sharedService.updateMenu('cropscan');
    }
    if (item === 'Total Grower Count') {
      console.log('redirecting to agrichain');
    }
  }

  isTotalAreaVsCropscan() {
    return totalAreaGraphTypes.some((res: any) =>
      this.roleService.isAccess(res.product_name, this.roles),
    );
  }

  isEsurvey() {
    return eSurveyGraphTypes.some((res: any) =>
      this.roleService.isAccess(res.product_name, this.roles),
    );
  }
}
