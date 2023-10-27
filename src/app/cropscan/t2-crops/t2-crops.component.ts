import { Component } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  debounceTime,
  filter,
  map,
  switchMap,
} from 'rxjs';
emoizationService } from 'src/app/_Services/Memoization/memoization.service';
