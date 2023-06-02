import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapLayoutComponent } from './map-layout/map-layout.component';
import { RouterModule, Routes } from '@angular/router';
import { ROLE_GUARD_TOKEN } from '../_Services/Dashboard/role.guard';
import { authGuard } from '../_Helper/auth.guard';


const routes: Routes = [
  {
    path: 'cropscan',
    component: MapLayoutComponent, canActivate:[ROLE_GUARD_TOKEN, authGuard],
  },
({
  imports: [
    [RouterModule.forChild(routes)],
    CommonModule,
  ]
})
export class CropscanModule { }
