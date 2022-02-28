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
