import { Component } from '@angular/core';
import { Color, ScaleType, LineChartModule } from '@swimlane/ngx-charts';

@Component({
    selector: 'app-weather-forecast-chart',
    templateUrl: './weather-forecast-chart.component.html',
    styleUrls: ['./weather-forecast-chart.component.scss'],
    standalone: true,
    imports: [LineChartModule],
})
export class WeatherForecastChartComponent {
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
l: boolean = true;
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Average Temperature';
  colorScheme: Color = {
    name: 'Variation',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#1BC693'],
  };
  weatherLineChart = [
    {
      name: 'Weather',
: [
