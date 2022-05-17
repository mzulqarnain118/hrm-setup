import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../auth/services/user.service';
import { Router } from '@angular/router';
import { SharedStateService } from '../_Services/shared-state.service';
import { combineLatest } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { RoleService } from '../_Services/roles.service';
import { menuList } from 'src/assets/constants/constants';
import { roles } from '../_Interfaces/dashboard';
import { LogoComponent } from '../cropscan/logo/logo.component';
import { NgClass, AsyncPipe } from '@angular/common';


    selector: 'app-global-navbar',
    templateUrl: './global-navbar.component.html',
    styleUrls: ['./global-navbar.component.scss'],
    standalone: true,
    imports: [
        NgClass,
        LogoComponent,
        AsyncPipe,
    ],
})
export class GlobalNavbarComponent implements OnInit {
  roles: roles[];
  private user = inject(UserService);
  protected sharedService = inject(SharedStateService);
  protected roleService = inject(RoleService);
  private router = inject(Router);
  username$ = this.sharedService.usernameObservable;

  menus = menuList;
  activeItem!: string;

  constructor() {
    const username = localStorage.getItem('iq-username');
    if (username) {
      this.sharedService.updateUsername(username);
    }
    let fetchCalled = false;
    combineLatest([this.sharedService.menu$, this.roleService.roles$]).pipe(
      filter(([menu, roles]) => menu !== null && roles !== null),
      map(([menu, roles]) => {
        this.activeItem = menu;
        this.roles = roles;
        
        if (roles.length === 0 && !fetchCalled && !this.isLoginPage()) {
          fetchCalled=true;
          this.roleService.fetchRoles().subscribe((response) => {
            this.roleService.updateRoles(response);
            this.roles = response;
subscribe();
  }

  ngOnInit(): void {
    this.sharedService.menu$.subscribe((res) => {
      this.activeItem = res;
    });
  }

  isLoginPage(): boolean {
    let isAuthenticated = localStorage.getItem('isAuthenticated');
    return (
      !this.menus.some((menu) => this.router.url.includes(menu.key)) ||
      !isAuthenticated
    );
  }

  setIsActive(item: string, isAccess: boolean) {
    if (!isAccess) return;
    this.sharedService.updateMenu(item);
    this.router.navigateByUrl(item);
  }

  signOut() {
    this.user.logout();
  }
}
