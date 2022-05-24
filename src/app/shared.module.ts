import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalNavbarComponent } from './global-navbar/global-navbar.component';
import { LogoComponent } from './cropscan/logo/logo.component';
import { MapComponent } from './cropscan/map/map.component';
import { MapLayoutComponent } from './cropscan/map-layout/map-layout.component';
import { DropdownComponent } from './cropscan/dropdown/dropdown.component';
import { LayerToggleComponent } from './cropscan/layer-toggle/layer-toggle.component';
import { ToggleSwitchComponent } from './cropscan/toggle-switch/toggle-switch.component';
import { NavbarComponent } from './cropscan/navbar/navbar.component';
import { SearchComponent } from './cropscan/search/search.component';
import { ExportDataComponent } from './cropscan/export-data/export-data.component';
import { ResizableDirective } from './_Directives/resizable.directive';
import { T3BarChartComponent } from './cropscan/t3-bar-chart/t3-bar-chart.component';
import { SidepanelComponent } from './cropscan/sidepanel/sidepanel.component';
import { SelectionBarComponent } from './cropscan/selection-bar/selection-bar.component';
import { T1AreasComponent } from './cropscan/t1-areas/t1-areas.component';
import { T2CropsComponent } from './cropscan/t2-crops/t2-crops.component';
import { TotalStatsComponent } from './cropscan/total-stats/total-stats.component';
import { AddCommasPipe } from './_Pipes/add-commas.pipe';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NdviChartComponent } from './yieldpro/ndvi-chart/ndvi-chart.component';
@NgModule({
    imports: [
        CommonModule,
        NgxChartsModule,
        FormsModule,
        DragDropModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        GlobalNavbarComponent,
        LogoComponent,
        MapComponent,
        MapLayoutComponent,
        DropdownComponent,
        LayerToggleComponent,
        ToggleSwitchComponent,
        NavbarComponent,
        SearchComponent,
        ExportDataComponent,
        ResizableDirective,
        T3BarChartComponent,
        SidepanelComponent,
        SelectionBarComponent,
        T1AreasComponent,
        T2CropsComponent,
        TotalStatsComponent,
        AddCommasPipe,
        GlobalNavbarComponent,
        NdviChartComponent
    ],
    exports: [
        SelectionBarComponent,
        NavbarComponent,
        MapComponent,
        T1AreasComponent,
        T2CropsComponent,
        T3BarChartComponent,
        NgxChartsModule,
        ToggleSwitchComponent,
        FormsModule,
        DragDropModule,
        GlobalNavbarComponent,
        NdviChartComponent,
        AddCommasPipe
    ]
})
export class SharedModule { }
