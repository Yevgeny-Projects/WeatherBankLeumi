import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherMainScreenComponent } from './weather-main-screen.component';

describe('WeatherMainScreenComponent', () => {
  let component: WeatherMainScreenComponent;
  let fixture: ComponentFixture<WeatherMainScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherMainScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherMainScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
