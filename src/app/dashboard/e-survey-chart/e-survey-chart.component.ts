import { Component, inject, OnInit } from '@angular/core';
import { Color, ScaleType, BarChartModule } from '@swimlane/ngx-charts';
import {eSurveyGraphTypes} from '../../../assets/constants/constants'
import { RoleService } from '../../_Services/roles.service';
import { roles } from 'src/app/_Interfaces/dashboard';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-e-survey-chart',
    templateUrl: './e-survey-chart.component.html',
    styleUrls: ['./e-survey-chart.component.scss'],
    standalone: true,
    imports: [FormsModule, BarChartModule],
})
export class ESurveyChartComponent implements OnInit {
  // options
  xAxisLabel = 'Days';
  protected dropdown=eSurveyGraphTypes;
  protected roleService=inject(RoleService);
  roles:roles[];

  yAxisLabel = 'Total Area Surveyed (Acres)';
  colorScheme: Color = {
    name: 'Variation',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#1BC693'],
  };

  activeItem: string = 'Months';
  isActive(item: string): boolean {
    return this.activeItem === item;
  }

  setIsActive(item: string) {
    this.activeItem = item;
  }

  single = [
    {
      name: '12 Feb',
      value: 10,
    },
    {
      name: '13 Feb',
      value: 50,
    },
    {
      name: '14 Feb',
      value: 12,
    },
    {
      name: '15 Feb',
      value: 3,
    },
    {
      name: '16 Feb',
      value: 23,
    },
    {
      name: '17 Feb',
      value: 45,
    },
    {
      name: '18 Feb',
      value: 10,
    },
    {
      name: '19 Feb',
      value: 50,
    },
  ];

  ngOnInit(): void {
    this.roleService.roles$.subscribe((res)=>{
      this.roles=res;
    })
  }

get filteredGraphTypes() {
  return eSurveyGraphTypes.filter(graph => 
      this.roleService.isAccess(graph.product_name, this.roles)
  )
}
}
