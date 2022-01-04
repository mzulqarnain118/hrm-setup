import { Component } from '@angular/core';
import { ApiService } from 'src/app/_Services/api.service';
import { Observable, map, tap } from 'rxjs';
import { SharedStateService } from 'src/app/_Services/shared-state.service';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
    selector: 'app-selection-bar',
    templateUrl: './selection-bar.component.html',
    styleUrls: ['./selection-bar.component.scss'],
    standalone: true,
    imports: [FormsModule, AsyncPipe],
})
export class SelectionBarComponent {
  // reportTypes: string[] = [];
  reportTypes$: Observable<string[]>;

  selectedReport: string;

  constructor(
    private apiService: ApiService,
    private sharedStateService: SharedStateService
  ) {}

  ngOnInit() {
    this.reportTypes$ = this.apiService
      .getAllReports()
      .pipe(map((res) => res.data));

    this.sharedStateService.ReportType$.subscribe((reportType) => {
      this.selectedReport = reportType;
    });
  }
  ngAfterViewInit() {}

  // If a report is selected, then the map component should be updated with the new report
  handleSelection(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const reportType = target.value;
    if (reportType === this.selectedReport) {
      return;
    }
    this.sharedStateService.emitReportType(reportType);
pe(reportType);
    //this.sharedStateService
  }
}
