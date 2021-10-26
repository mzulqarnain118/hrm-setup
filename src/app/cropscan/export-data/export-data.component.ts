import { Component, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedStateService } from 'src/app/_Services/shared-state.service';
import { environment } from 'src/environments/environment';
@Component({
    selector: 'app-export-data',
    templateUrl: './export-data.component.html',
    styleUrls: ['./export-data.component.scss'],
    standalone: true,
})
export class ExportDataComponent {
  constructor(
    private http: HttpClient,
    private renderer: Renderer2,
aredStateService: SharedStateService
