import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YieldproComponent } from './yieldpro.component';

describe('YieldproComponent', () => {
  let component: YieldproComponent;
  let fixture: ComponentFixture<YieldproComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [YieldproComponent]
});
    fixture = TestBed.createComponent(YieldproComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
