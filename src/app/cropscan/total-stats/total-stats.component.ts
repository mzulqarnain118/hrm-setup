import { Component } from '@angular/core';
import { Subject, combineLatest, filter, map, switchMap } from 'rxjs';
import { ApiService } from 'src/app/_Services/api.service';
import { SharedStateService } from 'src/app/_Services/shared-state.service';
import { AddCommasPipe } from '../../_Pipes/add-commas.pipe';
import { NgClass, AsyncPipe, KeyValuePipe } from '@angular/common';

export interface TotalStatsData {}
nt({
