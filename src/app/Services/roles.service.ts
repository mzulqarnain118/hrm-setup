import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { DashboardService } from './Dashboard/dashboard.service';
import { RoleTypes } from 'src/app/_Types/types';
import { SharedStateService } from './shared-state.service';
import { roles } from '../_Interfaces/dashboard';

@Injectable({
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
      box
        .toLowerCase()
        .includes(
          roleType === 'platfrom_name'
            ? res.platform_name.toLowerCase()
            : res.product_name.toLowerCase(),
        ),
    );
  }

  isActive(item: string | null): boolean {
    const activeMenu = this.sharedService.menu.value ?? 'dashboard'; // Handle null/undefined
    return activeMenu === item;
  }

  updateRoles(items: roles[]) {
    this.roles.next(items);
  }

  isEsurvey() {
    return this.roles$.pipe(
      map((res) => res.some((value) => value.product_name.toLowerCase() === 'esurvey'))
    );
  }
}
