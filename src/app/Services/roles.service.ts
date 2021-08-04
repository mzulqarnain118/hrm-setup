import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { DashboardService } from './Dashboard/dashboard.service';
import { RoleTypes } from 'src/app/_Types/types';
import { SharedStateService } from './shared-state.service';
import { roles } from '../_Interfaces/dashboard';
ctable({
  providedIn: 'root',
})
export class RoleService {
  private roles = new BehaviorSubject<roles[]>([]);
  roles$ = this.roles.asObservable().pipe();
  private dashboardService = inject(DashboardService);
  private sharedService = inject(SharedStateService);

  public fetchRoles(): Observable<roles[]> {
    return this.dashboardService.getRoles();
  }

  isAccess(
    box: string,
    rolesData: roles[],
    roleType: RoleTypes = 'product_name',
  ): boolean {
    if (box == 'dashboard') return true;
    if (!rolesData) {
      return false;
    }
    return rolesData.some((res) =>
werCase()
