import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportDataComponent } from './export-data.component';

describe('ExportDataComponent', () => {
  let component: ExportDataComponent;
  let fixture: ComponentFixture<ExportDataComponent>;

Each(() => {
    TestBed.configureTestingModule({
    imports: [ExportDataComponent]
});
    fixture = TestBed.createComponent(ExportDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportDataComponent } from './export-data.component';

describe('ExportDataComponent', () => {
  let component: ExportDataComponent;
  let fixture: ComponentFixture<ExportDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [ExportDataComponent]
});
    fixture = TestBed.createComponent(ExportDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
