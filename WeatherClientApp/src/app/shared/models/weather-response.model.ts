import { Clouds } from './weather-response/clouds.model';
import { Coord } from './weather-response/coord.model';
import { Main } from './weather-response/main.model';
import { Sys } from './weather-response/sys.model';
import { Weather } from './weather-response/weather.model';
import { Wind } from './weather-response/wind.model';

export interface WeatherResponseModel {
    coord: Coord;
    weather: Weather[];
    base: string;
    main: Main;
    visibility: number;
    wind: Wind;
    clouds: Clouds;
    dt: number;
    sys: Sys;
    timezone: number;
    id: number;
    name: string;
    cod: number;
}
