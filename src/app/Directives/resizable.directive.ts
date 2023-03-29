import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
    selector: '[resizable]',
    standalone: true
})
export class ResizableDirective {
  private isNearEdge = false;
  private readonly edgeThreshold = 40;  // Pixels from the right edge

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const rect = this.el.nativeElement.getBoundingClientRect();
    this.isNearEdge = rect.right - event.clientX <= this.edgeThreshold;
    if (this.isNearEdge) {
      this.renderer.setStyle(this.el.nativeElement, 'cursor', 'ew-resize');
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'cursor', '');
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    if (this.isNearEdge) {
      event.preventDefault();
      this.resize(event);
    }
  }


  private resize(event: MouseEvent) {
    const startX = event.clientX;
    const startWidth = this.el.nativeElement.offsetWidth;
    const mainContainer = this.el.nativeElement.closest('.mainContainer');
    const mapElement = mainContainer.querySelector('.mainmap');
    const flexContainer = document.querySelector('.flex-container');  // select the flex container

    const mouseMoveListener = (mouseEvent: MouseEvent) => {
      const width = startWidth + (mouseEvent.clientX - startX);
      if (width > 0) {
        this.renderer.setStyle(this.el.nativeElement, 'width', `${width}px`);
        this.renderer.setStyle(mapElement, 'width', `calc(100% - ${width}px)`);
        
        // Adjust the left position of the flex-container based on the expanded width of the sidepanel
        this.renderer.setStyle(flexContainer, 'left', `${width + 5}px`);  // Adding 5px as a buffer
      }
    };

    const mouseUpListener = () => {
      window.removeEventListener('mousemove', mouseMoveListener);
      window.removeEventListener('mouseup', mouseUpListener);
    };

    window.addEventListener('mousemove', mouseMoveListener);
    window.addEventListener('mouseup', mouseUpListener);
  }
}
