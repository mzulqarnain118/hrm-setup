import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [SearchComponent]
});
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
scribe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [SearchComponent]
});
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
