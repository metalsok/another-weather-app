import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY, Observable, Subject } from 'rxjs';
import { WeatherResponse } from '../../models/weather-response.interface';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private socket = io('http://localhost:3000');
  public message$ = new Subject();

  constructor(private httpClient: HttpClient) {
    this.socket.on('message', (data) => {
      this.message$.next(data);
    });
  }

  sendMessage(message: string) {
    this.socket.emit('message', message);
  }

  getCurrentWeather(location: string): Observable<WeatherResponse[]> {
    return this.httpClient
      .get<WeatherResponse[]>(`api/weather/current?city=${location}`)
      .pipe(catchError((err) => EMPTY));
  }
}
