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
  showXAxisLabel: boolean = true;
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
      series: [
        {
          name: 'Jan',
          value: 10,
        },
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
        {
          name: 'Jun',
          value: 45,
        },
        {
          name: 'Jul',
          value: 10,
        },
        {
          name: 'Aug',
          value: 50,
        },
        {
          name: 'Sep',
          value: 12,
        },
        {
          name: 'Oct',
          value: 3,
        },
        {
          name: 'Nov',
          value: 23,
        },
        {
          name: 'Dec',
          value: 45,
        },
      ],
    },
  ];
}
import { Component } from '@angular/core';
