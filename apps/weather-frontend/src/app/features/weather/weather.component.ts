import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { concatMap, debounceTime, distinctUntilChanged, filter, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  public locationControl: FormControl<string> = new FormControl();
  public currentWeather$ = this.locationControl.valueChanges.pipe(
    startWith('Kavala'),
    filter((value) => value.length >= 3),
    distinctUntilChanged(),
    debounceTime(300),
    concatMap((location) => {
      return this.service.getCurrentWeather(location);
    })
  );

  constructor(private service: WeatherService) {}

  ngOnInit(): void {
    this.service.message$.subscribe(console.log);
  }

  sendMessage() {
    this.service.sendMessage('Hello world');
  }
}
