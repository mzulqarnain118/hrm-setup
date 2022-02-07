import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import necessary form modules
import { distinctUntilChanged } from 'rxjs';
import Tileset from 'src/app/_Interfaces/Tileset';
import { MapService } from 'src/app/_Services/map.service';
import { colorMap } from 'src/assets/constants/colors';

@Component({
    selector: 'app-toggle-switch',
    templateUrl: './toggle-switch.component.html',
    styleUrls: ['./toggle-switch.component.scss'],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule],
})
export class ToggleSwitchComponent implements OnInit {
  @Input() tileset: Tileset;
  @Output() clickedEvent = new EventEmitter<Tileset>();
  modifiedTileset: string;
oolean = false;
