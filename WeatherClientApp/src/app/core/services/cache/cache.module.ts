// NG
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

// WEATHER
import { CacheOptions } from '@core/services/cache/cache-options';
import { CacheService } from '@core/services/cache/cache.service';


@NgModule({
	imports: [
		CommonModule,
	],
})
export class CacheModule {
	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: CacheModule,
			providers: [
				CacheOptions,
				CacheService,
			],
		};
	}
}
