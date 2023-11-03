import {Route} from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'homepage',
    loadChildren: () => import('./features/homepage/homepage.module').then(m => m.HomepageModule)
  },
  {
    path: 'weather',
    loadChildren: () => import('./features/weather/weather.module').then(m => m.WeatherModule)
  }

];
