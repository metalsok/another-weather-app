import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY, Observable, of } from 'rxjs';
import { WeatherResponse } from '../../models/weather-response.interface';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private httpClient: HttpClient) {}

  getCurrentWeather(location: string): Observable<WeatherResponse> {
    return this.httpClient
      .get<WeatherResponse>(`api/weather/current?city=${location}`)
      .pipe(catchError((err) => EMPTY));
  }

  getForecast(location: string): Observable<any> {
    return this.httpClient
      .get<any>(`api/weather/forecast?city=${location}`)
      .pipe(catchError((err) => EMPTY));
  }
}
