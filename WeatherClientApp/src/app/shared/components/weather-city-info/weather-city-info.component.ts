import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { WeatherResponseModel } from '@shared/models/weather-response.model';

@Component({
  selector: 'app-weather-city-info',
  templateUrl: './weather-city-info.component.html',
  styleUrls: ['./weather-city-info.component.scss']
})
export class WeatherCityInfoComponent implements OnInit {

  @Input() public weatherInfoModel: WeatherResponseModel;
  @Input() public iconBaseUrl: string;
  @Input() public cityInput: string;
  @Input() public currentDate: Date = new Date();

  public compassDir: string;
  public weatherIcon = "";
  private sector: string[] = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"];
  constructor() { }

  public ngOnInit() {
    this.InitScreen();
  }

  public ngOnChanges(changes: SimpleChanges) {

    this.InitScreen();
  }

  private InitScreen() {
    if (this.weatherInfoModel && this.weatherInfoModel.weather) {
      this.currentDate = new Date();
      this.compassDir = this.getCompassDir(this.weatherInfoModel.wind.deg);
      var icon: string = this.weatherInfoModel.weather[0].icon;
      this.weatherIcon = this.iconBaseUrl + icon + ".png";
    }
  }

  private getCompassDir(degree: number) {
    return this.sector[Math.floor((degree % 360) / 22.5) + 1];
  }

}
