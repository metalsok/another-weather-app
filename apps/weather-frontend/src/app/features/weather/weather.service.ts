import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY, Observable, of } from 'rxjs';
import { WeatherResponse } from '../../models/weather-response.interface';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private httpClient: HttpClient) {}

  getWeatherData(location: string): Observable<WeatherResponse> {
    return this.httpClient
      .get<WeatherResponse>(`api/weather?city=${location}`)
      .pipe(catchError((err) => EMPTY));
  }
}
