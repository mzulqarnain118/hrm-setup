import { Component } from '@angular/core';
import { Color, ScaleType, LineChartModule } from '@swimlane/ngx-charts';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-ndvi-chart',
    templateUrl: './ndvi-chart.component.html',
    styleUrls: ['./ndvi-chart.component.scss'],
    standalone: true,
    imports: [NgClass, FormsModule, LineChartModule]
})
export class NdviChartComponent {
  single: any[];
  protected view: any[] = [700, 400];
  protected showXAxis = true;
  protected showYAxis = true;
  protected gradient = false;
  protected showLegend = false;
  protected showXAxisLabel = true;
  protected xAxisLabel: "Years";
Label = true;
  protected yAxisLabel: "Salary";
  protected graphDataChart: any[];
  activeIndex: number = 0;
  colorScheme: Color = {
    name: 'Variation',
    selectable: true,
    group: ScaleType.Linear,
    domain: ['#1BC693'],
  };
  
  constructor(){
    this.single=[{
      name: 'Kumaresan',
      series: [
        {
          name: '2016',
          value: '0',
        },
        {
          name: '2017',
          value: '0.1',
        },
        {
          name: '2018',
          value: '0.2',
        },
        {
          name: '2019',
          value: '0.5',
        },
      ],
    },]
  }
  

   this.activeIndex = index;
