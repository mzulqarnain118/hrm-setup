import { Component } from '@angular/core';
import {
  Observable,
  combineLatest,
  distinctUntilChanged,
  map,
  of,
  shareReplay,
  takeLast,
  tap,
} from 'rxjs';
import { ApiService } from 'src/app/_Services/api.service';
import { MapService } from 'src/app/_Services/map.service';
import { SharedStateService } from 'src/app/_Services/shared-state.service';
import { SidepanelService } from 'src/app/_Services/sidepanel.service';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface DropdownData {}

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss'],
    standalone: true,
    imports: [FormsModule, AsyncPipe],
mponent {
