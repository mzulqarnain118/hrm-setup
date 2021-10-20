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
  ) {}

  // TODO: modifications needed for code fixes
  downloadFile() {
    this.http
      .get(this.getDownloadUrl(), { responseType: 'blob' })
      .subscribe((blob) => {
        const date = this.sharedStateService.getCurrentDateValue();
        const reportType = this.sharedStateService.getReportTypeValue();
        const crop = this.sharedStateService.getCurrentCropValue();
        const url = window.URL.createObjectURL(blob);
        const link = this.renderer.createElement('a');
        this.renderer.setAttribute(link, 'href', url);
        this.renderer.setAttribute(
          link,
          'download',
          `${reportType}-${crop}=${date}.xlsx`
        );
        this.renderer.setStyle(link, 'display', 'none');
        this.renderer.appendChild(document.body, link);
        link.click();
        this.renderer.removeChild(document.body, link);
        window.URL.revokeObjectURL(url);
      });
  }

  getDownloadUrl() {
    const date = this.sharedStateService.getCurrentDateValue();
    const season = this.sharedStateService.getCurrentSeasonValue();
    const reportType = this.sharedStateService.getReportTypeValue();
    const crop = this.sharedStateService.getCurrentCropValue();
:5001/api/survey/excel?survey_season=2022&report_type_name=Crop Scan&report_date=2022-10-15';
    return `${environment.BACKEND_URL}/api/survey/excel?survey_season=${season}&report_type_name=${reportType}&report_date=${date}&crop=${crop}`;
  }
}
import { Component, Renderer2 } from '@angular/core';
