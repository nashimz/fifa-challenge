import { Component, OnInit } from '@angular/core';

import { PlayerService } from '../../core/services/player.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { RadarChartComponent } from '../../core/radar-chart/radar-chart.component';
@Component({
  selector: 'app-player-profile',
  standalone: true,
  imports: [NgIf, CommonModule, RadarChartComponent, RouterLink],
  templateUrl: './player-profile.component.html',
  styleUrl: './player-profile.component.scss',
})
export class PlayerProfileComponent implements OnInit {
  player: any;
  playerAttributes: { name: string; value: number }[] = [];
  constructor(
    private route: ActivatedRoute,
    private _playerService: PlayerService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this._playerService.getPlayerById(+id).subscribe(
        (data) => {
          this.player = data;
          this.prepareAttributesForRadarChart(data);
        },
        (error) => {
          console.error('Error fetching player data:', error);
        }
      );
    }
  }

  private prepareAttributesForRadarChart(player: any): void {
    this.playerAttributes = [
      { name: 'Pace', value: player.pace },
      { name: 'Shooting', value: player.shooting },
      { name: 'Passing', value: player.passing },
      { name: 'Dribbling', value: player.dribbling },
      { name: 'Defending', value: player.defending },
      { name: 'Physical', value: player.physic },
    ];
  }
}
