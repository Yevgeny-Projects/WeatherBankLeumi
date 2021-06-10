// NG
import { Injectable, Injector } from '@angular/core';

// VENDOR
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// WEATHER
import { BaseHttpService } from '@core/services/http';
import { CityModel } from '@shared/models/city.model';
import { WeatherResponseModel } from '@shared/models/weather-response.model';

@Injectable({providedIn: 'root'})
export class WeatherInfoSharedService extends BaseHttpService {
    
    private endpoint: string = 'api/v1/bank-leumi/weather-info/';
    constructor(injector: Injector) {
		super(injector);
	}

	/**
	 * Get weather info per city
	 */
	public getWeatherPerCity(city: CityModel): Observable<WeatherResponseModel>{
		return this.post<WeatherResponseModel>(`${this.endpoint}`, city);
    }
}

    