import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherHistoryComponent } from './weather-history.component';

describe('WeatherHistoryComponent', () => {
  let component: WeatherHistoryComponent;
  let fixture: ComponentFixture<WeatherHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
