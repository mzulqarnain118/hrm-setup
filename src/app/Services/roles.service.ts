import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { DashboardService } from './Dashboard/dashboard.service';
import { RoleTypes } from 'src/app/_Types/types';
import { SharedStateService } from './shared-state.service';
import { roles } from '../_Interfaces/dashboard';
ctable({
