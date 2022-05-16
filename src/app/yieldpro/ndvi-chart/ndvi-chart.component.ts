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
