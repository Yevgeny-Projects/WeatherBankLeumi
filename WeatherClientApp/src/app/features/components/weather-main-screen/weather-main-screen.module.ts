// NG
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// WEATHER
import { WeatherMainScreenComponent } from './weather-main-screen.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { TypeaheadSearchModule } from '@shared/components/typeahead-search/typeahead-search.module';
import { WeatherCityInfoModule } from '@shared/components/weather-city-info';
import { WeatherHistoryModule } from '@shared/components/weather-history/weather-history.module';

@NgModule({
	declarations: [WeatherMainScreenComponent],
	exports: [WeatherMainScreenComponent],
	imports: [
        CommonModule,
        AutocompleteLibModule,
        FormsModule,
        HttpClientModule,
        TypeaheadSearchModule,
        WeatherCityInfoModule,
        WeatherHistoryModule
	],
})
export class WeatherMainScreenModule {
}
