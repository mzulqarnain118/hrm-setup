import { ComponentFixture, TestBed } from '@angular/core/testing';

import { T2CropsComponent } from './t2-crops.component';

describe('T2CropsComponent', () => {
  let component: T2CropsComponent;
  let fixture: ComponentFixture<T2CropsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [T2CropsComponent]
});
    fixture = TestBed.createComponent(T2CropsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
