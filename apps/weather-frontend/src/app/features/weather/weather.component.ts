import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import {
  concatMap,
  debounceTime,
  distinctUntilChanged,
  filter,
  Observable,
  of, startWith, tap
} from 'rxjs';
import { WeatherResponse } from '../../models/weather-response.interface';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  public locationControl: FormControl<string> = new FormControl();

  public weatherData$: Observable<WeatherResponse> = of();

  constructor(private service: WeatherService) {}

  ngOnInit() {
    this.weatherData$ = this.locationControl.valueChanges.pipe(
      startWith('Kavala'),
      filter(value => value.length >= 3),
      distinctUntilChanged(),
      debounceTime(300),
      concatMap((location) => this.service.getWeatherData(location)),
      tap(console.log)
    );
  }
}
