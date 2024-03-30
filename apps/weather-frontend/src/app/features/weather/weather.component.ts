import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import {
  concatMap,
  debounceTime,
  distinctUntilChanged,
  filter,
  Observable,
  of,
  startWith, tap
} from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  public locationControl: FormControl<string> = new FormControl();
  public currentWeather$: Observable<any[]> = of();

  constructor(private service: WeatherService) {}

  ngOnInit() {
    this.currentWeather$ = this.locationControl.valueChanges.pipe(
      startWith('Kavala'),
      filter((value) => value.length >= 3),
      distinctUntilChanged(),
      debounceTime(300),
      concatMap((location) => {
        return this.service.getCurrentWeather(location);
      }),
      tap(console.log)

    );
  }

  getIconClass(description: string): string {
    if (description.includes('cloudy')) {
      return 'cloudy';
    }
    if (description.includes('sun')) {
      return 'sunny';
    }
    if (description.includes('rain')) {
      return 'rainy';
    }
    if (description.includes('snow')) {
      return 'snowy';
    }
    return 'sunny';
  }
}
