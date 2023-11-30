import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('dropdownAnimation', [
      state(
        'closed',
        style({
          opacity: 0,
          transform: 'scale(0.95)',
        })
      ),
      state(
        'open',
        style({
          opacity: 1,
          transform: 'scale(1)',
        })
      ),
      transition('closed => open', animate('100ms ease-out')),
      transition('open => closed', animate('75ms ease-in')),
    ]),
  ],
})
export class AppComponent {
  constructor(private authService: AuthService) {}

  menuState = 'closed';

  toggleMenu() {
    this.menuState = this.menuState === 'open' ? 'closed' : 'open';
  }

  title = 'weather-frontend';

  get isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.menuState = 'closed';
    this.authService.clearToken();
  }
}
