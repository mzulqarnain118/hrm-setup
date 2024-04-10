import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemoizationService {
  private cache = new Map<string, Observable<any>>();

  memoize<T>(key: string, observable: Observable<T>): Observable<T> {
    if (!this.cache.has(key)) {
      this.cache.set(key, observable.pipe(shareReplay({ bufferSize: 1, refCount: true })));
    }
    return this.cache.get(key) as Observable<T>;
  }
}