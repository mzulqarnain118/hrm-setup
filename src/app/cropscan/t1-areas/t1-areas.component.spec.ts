import { ComponentFixture, TestBed } from '@angular/core/testing';

import { T1AreasComponent } from './t1-areas.component';

describe('T1AreasComponent', () => {
  let component: T1AreasComponent;
  let fixture: ComponentFixture<T1AreasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [T1AreasComponent]
});
    fixture = TestBed.createComponent(T1AreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
