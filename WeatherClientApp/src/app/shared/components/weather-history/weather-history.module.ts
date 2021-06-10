// NG
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// VENDOR
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

// WEATHER
import { WeatherCityInfoComponent } from '../weather-city-info';
import { WeatherHistoryComponent } from './weather-history.component';

@NgModule({
	declarations: [WeatherHistoryComponent],
	exports: [WeatherHistoryComponent],
	imports: [
		CommonModule,
		NgbModalModule,
		NgbModule
	],
	entryComponents: [WeatherCityInfoComponent]

})
export class WeatherHistoryModule {
}
