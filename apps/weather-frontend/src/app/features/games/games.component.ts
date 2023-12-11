import { Component, inject, OnInit } from '@angular/core';
import { GamesService } from './games.service';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule, NgForOf, NgIf } from '@angular/common';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { SelectComponent } from './select/select.component';

@Component({
  standalone: true,
  selector: 'app-games',
  templateUrl: 'games.component.html',
  styleUrls: ['games.component.scss'],
  imports: [NgIf, AsyncPipe, NgForOf, RouterOutlet, CommonModule, SelectComponent],
  providers: [GamesService],
})
export class GamesComponent implements OnInit {
  public gamesService = inject(GamesService);
  public activatedRoute = inject(ActivatedRoute);

  public games$: Observable<any> | undefined;
  public platforms$: Observable<any> | undefined;
  public platformParents$: Observable<any> | undefined;

  ngOnInit() {
    this.platformParents$ = this.gamesService.getPlatformParents();
    this.platforms$ = this.gamesService.getPlatforms();
    this.games$ = this.gamesService.getGames(['7'], new Date(), new Date());
  }
}
