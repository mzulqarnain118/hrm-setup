import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherForecastChartComponent } from './weather-forecast-chart.component';

describe('WeatherForecastChartComponent', () => {
  let component: WeatherForecastChartComponent;
  let fixture: ComponentFixture<WeatherForecastChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [WeatherForecastChartComponent]
});
    fixture = TestBed.createComponent(WeatherForecastChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
nt).toBeTruthy();
  });
});
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherForecastChartComponent } from './weather-forecast-chart.component';

describe('WeatherForecastChartComponent', () => {
  let component: WeatherForecastChartComponent;
  let fixture: ComponentFixture<WeatherForecastChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [WeatherForecastChartComponent]
});
    fixture = TestBed.createComponent(WeatherForecastChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
import { ComponentFixture, TestBed } from '@angular/core/testing';
