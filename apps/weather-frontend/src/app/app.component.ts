import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private authService: AuthService) {}

  title = 'weather-frontend';

  get isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.clearToken()
  }
}
