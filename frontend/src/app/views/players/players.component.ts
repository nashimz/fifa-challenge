import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  inject,
  Input,
  OnInit,
  PLATFORM_ID,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { PlayerCardComponent } from '../../core/player-card/player-card.component';
import { FormsModule } from '@angular/forms';
import { Players } from '../../core/model/players';
import { PlayerService } from '../../../../src/app/services/player.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(
    private _playersService: PlayerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.auth) {
      this.auth.isAuthenticated$.subscribe((isAuth) => {
        if (isAuth) {
          this.route.queryParams.subscribe((params) => {
            this.filters.name = params['name'] || '';
            this.filters.club = params['club'] || '';
            this.filters.position = params['position'] || '';
            this.currentPage = parseInt(params['page'], 10) || 1;

            this.loadPlayers(this.currentPage, this.filters);
          });
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
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        name: this.filters.name,
        club: this.filters.club,
        position: this.filters.position,
        page: 1, // Reset to first page
      },
      queryParamsHandling: 'merge',
    });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          page,
        },
        queryParamsHandling: 'merge',
      });
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

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  uploadCSV(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    this._playersService.uploadPlayersCSV(formData).subscribe({
      next: (res) => {
        alert(`Successfully uploaded ${res.count} players`);
        this.loadPlayers(this.currentPage); // Refresh list
      },
      error: (err) => {
        console.error('Error uploading CSV:', err);
        alert('Error uploading file.');
      },
    });

    input.value = ''; // Reset input so the same file can be re-uploaded
  }
}
