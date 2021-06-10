// NG
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';

// WEATHER
import { HttpErrorsInterceptor, XsrfInterceptor } from '@core/services/http/interceptors';

@NgModule({
	imports: [
		CommonModule,
		HttpClientModule,
	],
	exports: [],
})
export class HttpModule {
	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: HttpModule,
			providers: [
				{provide: HTTP_INTERCEPTORS, useClass: XsrfInterceptor, multi: true},
				{provide: HTTP_INTERCEPTORS, useClass: HttpErrorsInterceptor, multi: true},
			],
		};
	}
}
