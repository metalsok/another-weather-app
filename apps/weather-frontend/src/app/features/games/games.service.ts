import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GamesService {
  public httpClient = inject(HttpClient);

  getGames(platforms: string[], from: Date, to: Date) {
    return this.httpClient.get(
      `http://localhost:3000/api/rawg/games?platforms=${platforms}&dates=${from},${to}`
    );
  }

  getPlatforms() {
    return this.httpClient.get(`http://localhost:3000/api/rawg/platforms`);
  }

  getPlatformParents() {
    return this.httpClient.get(`http://localhost:3000/api/rawg/parents`);
  }
}
