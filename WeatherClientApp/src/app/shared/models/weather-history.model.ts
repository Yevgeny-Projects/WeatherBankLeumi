import { WeatherResponseModel } from './weather-response.model';

export interface WeatherHistoryModel {
    request_date: Date;
    weather_response_model: WeatherResponseModel;
}