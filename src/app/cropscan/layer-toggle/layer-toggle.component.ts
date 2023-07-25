import { Component } from '@angular/core';
import { MapService } from 'src/app/_Services/map.service';
import Tileset from 'src/app/_Interfaces/Tileset';
import { CdkDragDrop, CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';
import { BehaviorSubject, take } from 'rxjs';
import { ToggleSwitchComponent } from '../toggle-switch/toggle-switch.component';
import { NgClass, AsyncPipe } from '@angular/common';
@Component({
    selector: 'app-layer-toggle',
    templateUrl: './layer-toggle.component.html',
    styleUrls: ['./layer-toggle.component.scss'],
    standalone: true,
    imports: [
        NgClass,
        CdkDropList,
        CdkDrag,
        ToggleSwitchComponent,
        AsyncPipe,
    ],
})
export class LayerToggleComponent {
  isVisible: boolean = true;
  isToggledOn: boolean = false;

  protected tileSetSubject=new BehaviorSubject<Tileset[]>([]);
  combinedTilesets$ = this.tileSetSubject.asObservable();
  constructor(private mapService: MapService) {
    this.mapService.combinedTilesets$.subscribe(tilesets => {
      this.tileSetSubject.next(tilesets); // Updates tileSetSubject whenever combinedTilesets$ emits a new value
    });
  }

  // this is for collapsing the layer toggle
  toggleVisibility(): void {
    this.isVisible = !this.isVisible;
  }

  handleToggleChange(event: Tileset): void {
    this.mapService.HandleTilesetVisbility(event);
  }

  onDrop(event: CdkDragDrop<Tileset[]>) {
    const draggedItem = event.item.data;
    const targetIndex = event.currentIndex;
    const currentIndex = event.previousIndex;

    this.combinedTilesets$.pipe(
      take(1) // Take only the first emitted value
    ).subscribe(tilesets => {
      const updatedTilesets = [...tilesets];
      updatedTilesets.splice(currentIndex, 1);
      updatedTilesets.splice(targetIndex, 0, draggedItem);
      this.tileSetSubject.next(updatedTilesets);
      this.mapService.HandleOrderdTilesets(updatedTilesets);
    });
  }
}
