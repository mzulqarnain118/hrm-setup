import { Component } from '@angular/core';
import { MapService } from 'src/app/_Services/map.service';
import { SharedStateService } from 'src/app/_Services/shared-state.service';
import { MapComponent } from '../map/map.component';
import { NgClass, AsyncPipe } from '@angular/common';
import { SidepanelComponent } from '../sidepanel/sidepanel.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
    selector: 'app-map-layout',
    templateUrl: './map-layout.component.html',
    styleUrls: ['./map-layout.component.scss'],
    standalone: true,
    imports: [
        NavbarComponent,
        SidepanelComponent,
        NgClass,
        MapComponent,
        AsyncPipe,
    ],
})
export class MapLayoutComponent {
  constructor(
    protected sharedState: SharedStateService,
    private mapService:MapService
  ) {}

  userConfig: any;

  ngOnInit(): void {
    this.sharedState.isCollapse$.subscribe((res) => {
    this.mapService.mapResize();
    });
    this.sharedState.updateLoader(true);
  }

  ngAfterViewInit(): void {}
  collapseSideBar() {
    this.sharedState.updatedIsCollapse(false);
  }
}
