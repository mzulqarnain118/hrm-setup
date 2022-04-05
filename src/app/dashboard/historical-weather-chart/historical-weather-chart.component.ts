import { Component } from '@angular/core';
import { Color, ScaleType, LineChartModule } from '@swimlane/ngx-charts';

@Component({
    selector: 'app-historical-weather-chart',
    templateUrl: './historical-weather-chart.component.html',
    styleUrls: ['./historical-weather-chart.component.scss'],
    standalone: true,
    imports: [LineChartModule],
})
export class HistoricalWeatherChartComponent {
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Average Temperature';
  colorScheme: Color = {
    name: 'Variation',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#1BC693'],
  };
  activeItem: string = '1W';
  isActive(item: string): boolean {
    return this.activeItem === item;
  }

  setIsActive(item: string) {
    this.activeItem = item;
  }
  weatherLineChart = [
    {
      name: 'Weather',
      series: [
        {
          name: 'Jan',
  {
          name: 'Feb',
          value: 50,
        },
        {
     name: 'Mar',
          value: 12,
        },
        {
          name: 'Apr',
          value: 3,
        },
        {
          name: 'May',
          value: 23,
        },
         name: 'Jun',
