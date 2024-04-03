import { Component } from '@angular/core';
import { SharedStateService } from 'src/app/_Services/shared-state.service';
import { NdviTableComponent } from '../ndvi-table/ndvi-table.component';
import { T2CropsComponent } from '../../cropscan/t2-crops/t2-crops.component';
rt { SelectionBarComponent } from '../../cropscan/selection-bar/selection-bar.component';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-sidepanels',
    templateUrl: './sidepanel.component.html',
    styleUrls: ['./sidepanel.component.scss'],
    standalone: true,
    imports: [FormsModule, SelectionBarComponent, T2CropsComponent, NdviTableComponent]
})
export class SidepanelComponent {
  constructor(protected sharedState: SharedStateService) {
  }
  collapseSideBar() {
    this.sharedState.updatedIsCollapse(true);
  }

    handleSelection(event: Event): void {
      const target = event.target as HTMLSelectElement;
      const reportType = target.value;
    }
}
import { Component } from '@angular/core';
import { SharedStateService } from 'src/app/_Services/shared-state.service';
import { NdviTableComponent } from '../ndvi-table/ndvi-table.component';
import { T2CropsComponent } from '../../cropscan/t2-crops/t2-crops.component';
import { SelectionBarComponent } from '../../cropscan/selection-bar/selection-bar.component';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-sidepanels',
    templateUrl: './sidepanel.component.html',
    styleUrls: ['./sidepanel.component.scss'],
    standalone: true,
    imports: [FormsModule, SelectionBarComponent, T2CropsComponent, NdviTableComponent]
})
export class SidepanelComponent {
  constructor(protected sharedState: SharedStateService) {
  }
  collapseSideBar() {
    this.sharedState.updatedIsCollapse(true);
  }

    handleSelection(event: Event): void {
      const target = event.target as HTMLSelectElement;
      const reportType = target.value;
