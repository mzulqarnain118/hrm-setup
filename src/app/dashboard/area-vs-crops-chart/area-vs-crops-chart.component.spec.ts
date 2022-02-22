import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaVsCropsChartComponent } from './area-vs-crops-chart.component';

describe('AreaVsCropsChartComponent', () => {
  let component: AreaVsCropsChartComponent;
  let fixture: ComponentFixture<AreaVsCropsChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [AreaVsCropsChartComponent]
});
    fixture = TestBed.createComponent(AreaVsCropsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
