import { Component } from '@angular/core';

@Component({
    selector: 'app-ndvi-table',
    templateUrl: './ndvi-table.component.html',
    styleUrls: ['./ndvi-table.component.scss'],
    standalone: true
})
export class NdviTableComponent {
  data = [
    { name: "Blue", col1: 0.1, col2: 0.5 },
    { name: "Red", col1: 0.2, col2: 0.6 },
    { name: "Green", col1: 0.3, col2: 0.7 },
Yellow", col1: 0.4, col2: 0.8 }
  ];
  
}
