import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherCityInfoComponent } from './weather-city-info.component';

describe('WeatherCityInfoComponent', () => {
  let component: WeatherCityInfoComponent;
  let fixture: ComponentFixture<WeatherCityInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherCityInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherCityInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
