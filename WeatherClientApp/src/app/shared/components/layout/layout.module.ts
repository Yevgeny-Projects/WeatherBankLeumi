// NG
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// WEATHER
import { LayoutComponent } from './layout.component';

@NgModule({
	declarations: [LayoutComponent],
	exports: [LayoutComponent],
	imports: [
		CommonModule,
	],
})
export class LayoutModule {
}