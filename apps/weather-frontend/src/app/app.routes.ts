import { Route } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';

export const appRoutes: Route[] = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'homepage',
    loadChildren: () =>
      import('./features/homepage/homepage.module').then(
        (m) => m.HomepageModule
      ),
    canActivate: [authGuard],
  },
  {
    path: 'weather',
    loadChildren: () =>
      import('./features/weather/weather.module').then((m) => m.WeatherModule),
    canActivate: [authGuard],
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./features/about/about.module').then((m) => m.AboutModule),
    canActivate: [authGuard],
  },
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
];
