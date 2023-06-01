import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from "../shared.module";
import { ConsoleComponent } from './console/console.component';
import { ROLE_GUARD_TOKEN } from '../_Services/Dashboard/role.guard';
import { authGuard } from '../_Helper/auth.guard';

const routes: Routes = [
  {
    path: 'console',
    component: ConsoleComponent, canActivate:[ROLE_GUARD_TOKEN, authGuard],
  },
];

@NgModule({
    imports: [
        [RouterModule.forChild(routes)],
        CommonModule,
        NgxChartsModule,
        SharedModule,
        ConsoleComponent
    ]
})
export class ConsoleModule { }
