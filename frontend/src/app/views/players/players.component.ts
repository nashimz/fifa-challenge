import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { PlayerCardComponent } from '../../core/player-card/player-card.component';
import { FormsModule } from '@angular/forms';
import { Players } from '../../core/model/players';
import { PlayerService } from '../../core/services/player.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [CommonModule, PlayerCardComponent, FormsModule, RouterLink],
  templateUrl: './players.component.html',
  styleUrl: './players.component.scss',
})
export class PlayersComponent implements OnInit {
  Players: Players[] = [];
  totalPages = 0;
  currentPage = 1;

  filters = { name: '', club: '', position: '' };

  private platformId = inject(PLATFORM_ID);
  private auth = isPlatformBrowser(this.platformId)
    ? inject(AuthService)
    : null;

  isAuthenticated$ = this.auth?.isAuthenticated$;

  constructor(
    private _playersService: PlayerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.auth) {
      this.auth.isAuthenticated$.subscribe((isAuth) => {
        if (isAuth) {
          this.loadPlayers(this.currentPage, this.filters);
          this.applyFilters();
        }
      });
    }
  }

  loadPlayers(page: number, filters = this.filters): void {
    this._playersService
      .getListaPlayers(page, filters)
      .subscribe((response) => {
        this.Players = response.players;
        this.totalPages = response.totalPages;
        this.currentPage = response.currentPage;
      });
  }

  applyFilters(): void {
    this.currentPage = 1;
    const filters = {
      name: this.filters.name || '',
      club: this.filters.club || '',
      position: this.filters.position || '',
    };

    this._playersService
      .getListaPlayers(this.currentPage, filters)
      .subscribe((response) => {
        this.Players = response.players;
        this.totalPages = response.totalPages;
        this.currentPage = response.currentPage;
      });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.loadPlayers(page);
    }
  }

  downloadCSV(): void {
    this._playersService.downloadPlayersCSV(this.filters).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'players.csv';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Error downloading CSV:', err);
      },
    });
  }
}
