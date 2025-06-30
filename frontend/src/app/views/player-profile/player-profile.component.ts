import { Component, OnInit } from '@angular/core';

import { PlayerService } from '../../../../src/app/services/player.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { RadarChartComponent } from '../../core/radar-chart/radar-chart.component';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { SkillTimelineChartComponent } from '../../core/skill-timeline-chart/skill-timeline-chart.component';

@Component({
  selector: 'app-player-profile',
  standalone: true,
  imports: [
    NgIf,
    CommonModule,
    RadarChartComponent,
    RouterLink,
    FormsModule,
    SkillTimelineChartComponent,
  ],
  templateUrl: './player-profile.component.html',
  styleUrl: './player-profile.component.scss',
})
export class PlayerProfileComponent implements OnInit {
  player: any;
  playerAttributes: { name: string; value: number }[] = [];

  skillsTimeline: Record<string, { fifa_version: number; value: number }[]> =
    {};
  skillsToShow = ['pace', 'shooting', 'passing'];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private _playerService: PlayerService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this._playerService.getPlayerById(+id).subscribe((player) => {
        this.player = player;
        this.prepareAttributesForRadarChart(player);
        this.loadSkillTimeline(+id, 'pace,passing,shooting');
      });
    }
  }

  prepareAttributesForRadarChart(player: any) {
    this.playerAttributes = [
      { name: 'Pace', value: player.pace },
      { name: 'Shooting', value: player.shooting },
      { name: 'Passing', value: player.passing },
      { name: 'Dribbling', value: player.dribbling },
      { name: 'Defending', value: player.defending },
      { name: 'Physical', value: player.physic },
    ];
  }

  loadSkillTimeline(playerId: number, skill: string) {
    this._playerService.getPlayerSkillTimeline(playerId, [skill]).subscribe({
      next: (timeline) => {
        this.skillsTimeline = timeline;
      },
      error: (err) => {
        console.error('Failed to load skill timeline:', err);
      },
    });
  }
}
