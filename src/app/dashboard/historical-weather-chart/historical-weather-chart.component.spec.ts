import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalWeatherChartComponent } from './historical-weather-chart.component';

describe('HistoricalWeatherChartComponent', () => {
  let component: HistoricalWeatherChartComponent;
  let fixture: ComponentFixture<HistoricalWeatherChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [HistoricalWeatherChartComponent]
});
    fixture = TestBed.createComponent(HistoricalWeatherChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
