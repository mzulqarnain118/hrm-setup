import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ESurveyChartComponent } from './e-survey-chart.component';

describe('ESurveyChartComponent', () => {
  let component: ESurveyChartComponent;
  let fixture: ComponentFixture<ESurveyChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [ESurveyChartComponent]
});
    fixture = TestBed.createComponent(ESurveyChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
