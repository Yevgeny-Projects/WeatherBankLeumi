// NG
import {
	NgModule,
	ModuleWithProviders
} from '@angular/core';


@NgModule()
export class UtilityModule {
	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: UtilityModule,
		};
	}
}
