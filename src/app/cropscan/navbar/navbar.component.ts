import { Component, ElementRef, ViewChild, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MapService } from 'src/app/_Services/map.service';
import { SearchService } from 'src/app/_Services/search.service';
import { SearchOption } from 'src/app/_Types/types';
import { ExportDataComponent } from '../export-data/export-data.component';
import { SearchComponent } from '../search/search.component';
import { DropdownComponent } from '../dropdown/dropdown.component';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    standalone: true,
    imports: [
        DropdownComponent,
        SearchComponent,
        ExportDataComponent,
    ],
})
export class NavbarComponent {
  
  @ViewChild('dialog') dialog: ElementRef;

  constructor(private mapService: MapService){}
ocation.reload();
  }

  ImageToggle(event:any) {
    this.mapService.toggleImagery();
  }

  openDialog() {
    this.dialog.nativeElement.showModal();
  }

  closeDialog() {
    this.dialog.nativeElement.close();
  }
  
  takeUserToAoi () {
    this.mapService.takeUserToAoi();
  }

}
import { Component, ElementRef, ViewChild, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MapService } from 'src/app/_Services/map.service';
import { SearchService } from 'src/app/_Services/search.service';
import { SearchOption } from 'src/app/_Types/types';
import { ExportDataComponent } from '../export-data/export-data.component';
import { SearchComponent } from '../search/search.component';
import { DropdownComponent } from '../dropdown/dropdown.component';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    standalone: true,
    imports: [
        DropdownComponent,
        SearchComponent,
        ExportDataComponent,
    ],
})
export class NavbarComponent {
  
  @ViewChild('dialog') dialog: ElementRef;

  constructor(private mapService: MapService){}
  reload() {
    window.location.reload();
  }

  this.mapService.toggleImagery();
  }

  openDialog() {
    this.dialog.nativeElement.showModal();
  }

  closeDialog() {
    this.dialog.nativeElement.close();
  }
  
  takeUserToAoi () {
    this.mapService.takeUserToAoi();
  }

}
import { Component, ElementRef, ViewChild, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MapService } from 'src/app/_Services/map.service';
import { SearchService } from 'src/app/_Services/search.service';
import { SearchOption } from 'src/app/_Types/types';
import { ExportDataComponent } from '../export-data/export-data.component';
import { SearchComponent } from '../search/search.component';
import { DropdownComponent } from '../dropdown/dropdown.component';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    standalone: true,
    imports: [
        DropdownComponent,
        SearchComponent,
        ExportDataComponent,
    ],
})
export class NavbarComponent {
  
  @ViewChild('dialog') dialog: ElementRef;

  constructor(private mapService: MapService){}
  reload() {
    window.location.reload();
  }

  ImageToggle(event:any) {
    this.mapService.toggleImagery();
  }

  openDialog() {
    this.dialog.nativeElement.showModal();
  }

  closeDialog() {
    this.dialog.nativeElement.close();
  }
  
takeUserToAoi();
  }

}
import { Component, ElementRef, ViewChild, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MapService } from 'src/app/_Services/map.service';
import { SearchService } from 'src/app/_Services/search.service';
import { SearchOption } from 'src/app/_Types/types';
import { ExportDataComponent } from '../export-data/export-data.component';
import { SearchComponent } from '../search/search.component';
import { DropdownComponent } from '../dropdown/dropdown.component';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    standalone: true,
    imports: [
        DropdownComponent,
        SearchComponent,
        ExportDataComponent,
    ],
})
export class NavbarComponent {
  
  @ViewChild('dialog') dialog: ElementRef;

  constructor(private mapService: MapService){}
  reload() {
    window.location.reload();
  }

  this.mapService.toggleImagery();
  }

  openDialog() {
    this.dialog.nativeElement.showModal();
  }

  closeDialog() {
    this.dialog.nativeElement.close();
  }
  
  takeUserToAoi () {
    this.mapService.takeUserToAoi();
  }

}
