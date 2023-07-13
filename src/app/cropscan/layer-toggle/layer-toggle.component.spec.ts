import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerToggleComponent } from './layer-toggle.component';

describe('LayerToggleComponent', () => {
  let component: LayerToggleComponent;
  let fixture: ComponentFixture<LayerToggleComponent>;

  beforeEach(() => {
ed.configureTestingModule({
    imports: [LayerToggleComponent]
});
    fixture = TestBed.createComponent(LayerToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerToggleComponent } from './layer-toggle.component';

describe('LayerToggleComponent', () => {
  let component: LayerToggleComponent;
  let fixture: ComponentFixture<LayerToggleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [LayerToggleComponent]
});
    fixture = TestBed.createComponent(LayerToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
