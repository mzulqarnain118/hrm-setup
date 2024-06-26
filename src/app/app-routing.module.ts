import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './_Helper/auth.guard';
import { DashboardModule } from './dashboard/dashboard.module';
import { CropscanModule } from './cropscan/cropscan.module';
import { YieldproModule } from './yieldpro/yieldpro.module';
import { ROLE_GUARD_TOKEN } from './_Services/Dashboard/role.guard';
import { ConsoleModule } from './console/console.module';
import { SigninComponent } from './auth/signin/signin.component';

const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: 'signin', component:SigninComponent},

  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    canActivate: [authGuard],
  },
  {
    path: 'cropscan',
    loadChildren: () =>
      import('./cropscan/cropscan.module').then((m) => m.CropscanModule),
    canActivate: [ROLE_GUARD_TOKEN, authGuard],
    data: { roles: ['cropscan'] },
  },
  {
    path: 'yieldpro',
    loadChildren: () =>
      import('./yieldpro/yieldpro.module').then((m) => m.YieldproModule),
KEN, authGuard],
    data: { roles: ['yieldpro'] },
  },
  {
path: 'console',
    loadChildren: () =>
      import('./console/console.module').then((m) => m.ConsoleModule),
    canActivate: [ROLE_GUARD_TOKEN, authGuard],
    data: { roles: ['console'] },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    DashboardModule,
    CropscanModule,
    YieldproModule,
    ConsoleModule
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './_Helper/auth.guard';
import { DashboardModule } from './dashboard/dashboard.module';
import { CropscanModule } from './cropscan/cropscan.module';
import { YieldproModule } from './yieldpro/yieldpro.module';
import { ROLE_GUARD_TOKEN } from './_Services/Dashboard/role.guard';
import { ConsoleModule } from './console/console.module';
import { SigninComponent } from './auth/signin/signin.component';

const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: 'signin', component:SigninComponent},

  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    canActivate: [authGuard],
  },
  {
    path: 'cropscan',
    loadChildren: () =>
      import('./cropscan/cropscan.module').then((m) => m.CropscanModule),
    canActivate: [ROLE_GUARD_TOKEN, authGuard],
    data: { roles: ['cropscan'] },
  },
   loadChildren: () =>
      import('./yieldpro/yieldpro.module').then((m) => m.YieldproModule),
    canActivate: [ROLE_GUARD_TOKEN, authGuard],
    data: { roles: ['yieldpro'] },
  },
  {
    path: 'console',
    loadChildren: () =>
      import('./console/console.module').then((m) => m.ConsoleModule),
    canActivate: [ROLE_GUARD_TOKEN, authGuard],
    data: { roles: ['console'] },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    DashboardModule,
    CropscanModule,
    YieldproModule,
    ConsoleModule
erModule],
})
export class AppRoutingModule {}
