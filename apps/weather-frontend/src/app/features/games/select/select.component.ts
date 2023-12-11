import { Component, Input } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-weather-app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  imports: [NgForOf, NgIf],
})
export class SelectComponent {
  @Input() items: { name: string }[] = [];
  public active: boolean = false;
}
