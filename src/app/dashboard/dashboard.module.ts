import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreaVsCropsChartComponent } from './area-vs-crops-chart/area-vs-crops-chart.component';
import { HistoricalWeatherChartComponent } from './historical-weather-chart/historical-weather-chart.component';
import { WeatherForecastChartComponent } from './weather-forecast-chart/weather-forecast-chart.component';
import { ESurveyChartComponent } from './e-survey-chart/e-survey-chart.component';
import { DashboardComponent } from './dashboard.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../_Helper/auth.guard';
import { DropdownFilterComponent } from './dropdown-filter/dropdown-filter.component';
import { SharedModule } from '../shared.module';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
({
    imports: [
        [RouterModule.forChild(routes)],
        CommonModule,
        NgxChartsModule,
        SharedModule,
        DashboardComponent,
        AreaVsCropsChartComponent,
        HistoricalWeatherChartComponent,
        WeatherForecastChartComponent,
        ESurveyChartComponent,
        DropdownFilterComponent
    ]
})
export class DashboardModule {}
