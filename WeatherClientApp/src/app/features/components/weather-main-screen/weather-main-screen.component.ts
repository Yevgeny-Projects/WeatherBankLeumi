// NG
import { Component, OnInit } from '@angular/core';

// VENDOR
import { interval, Observable, Subscription } from 'rxjs';
import { SubSink } from 'subsink';

// WEATHER
import { AutoCompleteItemModel } from '@shared/models/auto-complete-item.model';
import { CitySharedService } from '@shared/services/city/city-shared.service';
import { WeatherInfoSharedService } from '@shared/services/weather/weather-info.service';
import { WeatherResponseModel } from '@shared/models/weather-response.model';
import { flatMap } from 'rxjs/operators';
import { WeatherHistoryModel } from '@shared/models/weather-history.model';
import { CityModel } from '@shared/models';

@Component({
  selector: 'app-weather-main-screen',
  templateUrl: './weather-main-screen.component.html',
  styleUrls: ['./weather-main-screen.component.scss']
})
export class WeatherMainScreenComponent implements OnInit {

  public placeHolder = "Enter the City name";

  public cities$: Observable<AutoCompleteItemModel[]>;
  public weatherInfo$: Observable<WeatherResponseModel>;
 
  public cities: AutoCompleteItemModel[];
  public weatherResponseModel: WeatherResponseModel;
  public weatherHistoryModel: WeatherHistoryModel[] = [];
  public iconBaseUrl = "https://openweathermap.org/img/wn/"; 
  public cityInput = '';

  private subs = new SubSink();
  private interval$: Subscription;

  /**
   * Constructor
   */
  constructor(private citySharedService: CitySharedService,
              private weatherInfoSharedService: WeatherInfoSharedService) {
  }

  /**
   * OnInit hook
   */
  public ngOnInit() {
    this.cities$ = this.citySharedService.getCityAutoCompleteModel();
    this.subs.sink = this.cities$.subscribe(data => this.cities = data);
  }

  /**
   * This function will fired when city choosen
   * @param item 
   */
  public selectEvent(item) {
    
    let cityModel: CityModel = Object.assign({}, item.target.data);
    
    if (this.interval$)
      this.interval$.unsubscribe();

    this.cityInput = cityModel.name;
    this.weatherInfo$ = this.weatherInfoSharedService.getWeatherPerCity(cityModel);
    this.subs.sink = this.weatherInfo$.subscribe(data => 
      { 
        this.onWeatherInfoSub(data);
      });

      this.interval$ =  interval(60 * 1000)
      .pipe(
          flatMap(() => this.weatherInfoSharedService.getWeatherPerCity(cityModel))
      )
      .subscribe(data => {
        this.onWeatherInfoSub(data);
      })
  }

  public onClosed(e) {
    // do something
  }

  public onFocused(e) {
    // do something
  }

  public ngOnOestroy() {
   this.subs.unsubscribe();
   this.interval$.unsubscribe();
  }

  /**
   * Add weather response model to history object
   * @param weatherResponseModel 
   */
  private addToHistory(weatherResponseModel: WeatherResponseModel) {
    let item: WeatherHistoryModel = {
      request_date: new Date(),
      weather_response_model: weatherResponseModel
    }
    
    this.weatherHistoryModel.unshift(item);
  
    if (this.weatherHistoryModel.length > 10) {
      this.weatherHistoryModel.pop();
    } 
  }

  private onWeatherInfoSub(data: WeatherResponseModel) {
    this.weatherResponseModel = data;
    if (data && data.weather) {
      this.addToHistory(data);
    }
  }
}
