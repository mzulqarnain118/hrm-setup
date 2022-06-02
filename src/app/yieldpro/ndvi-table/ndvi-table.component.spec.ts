import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NdviTableComponent } from './ndvi-table.component';

describe('NdviTableComponent', () => {
  let component: NdviTableComponent;
  let fixture: ComponentFixture<NdviTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [NdviTableComponent]
});
    fixture = TestBed.createComponent(NdviTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
