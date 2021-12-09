import { Component } from '@angular/core';
import { MapService } from 'src/app/_Services/map.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    standalone: true,
    imports: [FormsModule],
})
export class SearchComponent {
  searchOptions = ['Coordinate', 'Field ID'];
  staticText = 'Search by ';
  placeholder = 'Coordinate';
  searchText: string = '';

  constructor(private mapService: MapService) {}

  emitSearchOption(event: any) {
    this.placeholder = event.target.value;
    if (event.target.value === 'Field ID') {
      this.mapService.setEsurveyZoom();
    }
  }

  clearInput() {
    this.searchText = '';
    this.mapService.resetSearchZoom(this.placeholder);
  }

  onSearchTextChange(event: any) {
    if (event == '') {
      this.clearInput();
    }
  }
  emitSearchQuery(event: any) {
    if (event.target.value === '') {
      return;
    }
aceholder, event.target.value);
  }
}
