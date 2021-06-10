// NG
import { Injectable, Injector } from '@angular/core';

// VENDOR
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// WEATHER
import { BaseHttpService } from '@core/services/http';
import { Cacheable, CacheMe, CacheService } from '@core/services/cache';
import { CityModel } from '@shared/models/city.model';
import { AutoCompleteItemModel } from '@shared/models/auto-complete-item.model';

@Injectable({providedIn: 'root'})
export class CitySharedService extends BaseHttpService implements Cacheable {
	constructor(injector: Injector,
				public cacheService: CacheService) {
		super(injector);
	}

	/**
	 * Get editable scheduled tasks sub type model
	 */
	@CacheMe()
	public getCityAutoCompleteModel(): Observable<AutoCompleteItemModel[]> {
		return this.get('api/v1/bank-leumi/city-info/', {})
					.pipe(
						map((response: CityModel[]) => {
							return response.map((item: CityModel) => {
								return {
									name: item.name,
									id: item.id,
									icon: "/assets/Icons/CountriesFlags/" + item.shortStateName.toLowerCase() + ".png",
									data: item
								} as AutoCompleteItemModel;
							});
						})
					);
	}
}
