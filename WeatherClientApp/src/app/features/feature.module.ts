// NG
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// WEATHER
import { WeatherMainScreenModule } from './components/weather-main-screen/weather-main-screen.module';

@NgModule({
	imports: [
		CommonModule,
	],
	exports: [
		WeatherMainScreenModule,
	]
})
export class FeatureModule {
}
