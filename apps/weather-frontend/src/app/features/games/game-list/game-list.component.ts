import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesService } from '../games.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css'],
})
export class GameListComponent implements OnInit {
  private gameService = inject(GamesService);
  private activatedRoute = inject(ActivatedRoute);

  ngOnInit() {
  }
}
