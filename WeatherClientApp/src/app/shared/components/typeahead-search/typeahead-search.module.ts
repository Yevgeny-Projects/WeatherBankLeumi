// NG
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// WEATHER
import { TypeaheadSearchComponent } from './typeahead-search.component';

@NgModule({
	declarations: [TypeaheadSearchComponent],
	exports: [TypeaheadSearchComponent],
	imports: [
		CommonModule,
	],
})
export class TypeaheadSearchModule {
}
