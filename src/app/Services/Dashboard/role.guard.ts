import { InjectionToken } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { RoleService } from '../roles.service';

export const ROLE_GUARD_TOKEN = new InjectionToken<CanActivateFn>('roleGuard');

export function roleGuardFactory(roleService: RoleService, router: Router): CanActivateFn {
  return (route: any) => {
    const requiredPlatform = route.routeConfig.path;


return roleService.roles$.pipe(
  switchMap(roles => {
    if (roles.length === 0) { 
      return roleService.fetchRoles().pipe(
        catchError(error => {
          console.error('Error retrieving roles:', error);
          router.navigate(['/signin']);
          return of([]); 
        })
      );
    } else {
      return of(roles);
    }
  }),
  switchMap(roles => {
    console.log(roles);
    return of(roles.some(role => role.platform_name.toLowerCase() === requiredPlatform));
  }),
  catchError(error => {
    console.error('Error retrieving roles:', error);
    router.navigate(['/signin']);
    return of(false);
  })
);

  };
}

export const roleGuardProvider = [
  { provide: ROLE_GUARD_TOKEN, useFactory: roleGuardFactory, deps: [RoleService, Router] }
];
import { InjectionToken } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { RoleService } from '../roles.service';

export const ROLE_GUARD_TOKEN = new InjectionToken<CanActivateFn>('roleGuard');

export function roleGuardFactory(roleService: RoleService, router: Router): CanActivateFn {
  return (route: any) => {
    const requiredPlatform = route.routeConfig.path;


return roleService.roles$.pipe(
  switchMap(roles => {
    if (roles.length === 0) { 
      return roleService.fetchRoles().pipe(
        catchError(error => {
          console.error('Error retrieving roles:', error);
          router.navigate(['/signin']);
          return of([]); 
        })
      );
    } else {
      return of(roles);
    }
  }),
  switchMap(roles => {
    console.log(roles);
    return of(roles.some(role => role.platform_name.toLowerCase() === requiredPlatform));
  }),
  catchError(error => {
    console.error('Error retrieving roles:', error);
    router.navigate(['/signin']);
    return of(false);
  })
);

  };
}

export const roleGuardProvider = [
  { provide: ROLE_GUARD_TOKEN, useFactory: roleGuardFactory, deps: [RoleService, Router] }
];
