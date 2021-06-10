// NG
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// WEATHER
import { WeatherCityInfoComponent } from './weather-city-info.component';

@NgModule({
	declarations: [WeatherCityInfoComponent],
	exports: [WeatherCityInfoComponent],
	imports: [
		CommonModule,
	],
})
export class WeatherCityInfoModule {
}
