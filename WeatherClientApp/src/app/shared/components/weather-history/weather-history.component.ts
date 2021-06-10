import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WeatherHistoryModel } from '@shared/models/weather-history.model';
import { WeatherCityInfoComponent } from '../weather-city-info';

@Component({
  selector: 'app-weather-history',
  templateUrl: './weather-history.component.html',
  styleUrls: ['./weather-history.component.scss']
})
export class WeatherHistoryComponent implements OnInit {
   
  @Input() public historyDataList: Array<WeatherHistoryModel>;
  @Input() public iconBaseUrl: string;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  open(model: WeatherHistoryModel) {
    const modalRef = this.modalService.open(WeatherCityInfoComponent,
      {
        windowClass: 'pl-4',
        
      }
      );
    modalRef.componentInstance.weatherInfoModel = model.weather_response_model;
    modalRef.componentInstance.currentDate = model.request_date;
    modalRef.componentInstance.cityInput = model.weather_response_model.name;
    modalRef.componentInstance.centered = true;
    modalRef.componentInstance.iconBaseUrl = this.iconBaseUrl;
    modalRef.componentInstance.windowClass = "'pl-4'";
    
  }

}
