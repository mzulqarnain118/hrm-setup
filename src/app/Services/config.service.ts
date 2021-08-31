import { Injectable } from '@angular/core';
import ZoomActions from '../_Interfaces/ZoomActions';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  zoomLevels: ZoomActions[];

  constructor() {}
}
