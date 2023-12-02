import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state(
        'void',
        style({
          opacity: 0,
          width: '0px', // Adjust the width
        })
      ),
      transition('void <=> *', animate(100)), // 500ms transition
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
  selected = true;
  links = ['homepage', 'weather', 'gaming', 'about'];
  selectedIndex = 0;

  get isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.menuState = 'closed';
    this.authService.clearToken();
  }

  selectLink(i: number) {
    this.selectedIndex = i;
  }
}
