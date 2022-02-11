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
  color= new FormControl('#0000ff') // Default value for color

  @ViewChild('input') input: ElementRef;

  constructor(private fb: FormBuilder, private mapService:MapService) {
    // Initialize the form group in the constructor
  }

  ngOnInit(): void {
    this.color.valueChanges.pipe(distinctUntilChanged()).subscribe((res:string|null)=>{
      this.color.setValue(res);
      if(res)
      this.mapService.HandleTilesetColor(this.tileset)
    })
  }
  ngOnChanges(): void {
    if (this.tileset && this.tileset.name) {
      let separator = this.tileset.name.includes('_') ? '_' : '-';
      let parts = this.tileset.name.split(separator);
      parts.shift(); // Remove the first element
      this.modifiedTileset = parts.join(separator);
    }

    this.color.setValue(this.getColorForKey(this.tileset.name))
  }

  onToggle(): void {
    this.tileset.visible = !this.tileset.visible;
    this.clickedEvent.emit(this.tileset);
  }

  showImage() {
    this.showMenuImage = true;
  }

  hideImage() {
    this.showMenuImage = false;
  }

  onColorPicker(tileset: Tileset) {
    this.input.nativeElement.click();
 {
    const colorObj = colorMap.find(item => key.toLowerCase().includes(item.name.toLowerCase()));
    return colorObj ? colorObj.value : '#757070'; // default to black if key is not found
  }
}
import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, OnInit } from '@angular/core';
