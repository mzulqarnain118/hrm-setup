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
