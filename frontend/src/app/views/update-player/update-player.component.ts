import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from '../../../../src/app/services/player.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-player',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-player.component.html',
  styleUrls: ['./update-player.component.scss'],
})
export class UpdatePlayerComponent implements OnInit {
  updateForm!: FormGroup;
  playerId!: number;
  // Define the input fields for the form
  inputFields = [
    { name: 'long_name', label: 'Name', type: 'text' },
    { name: 'player_positions', label: 'Position', type: 'text' },
    { name: 'club_name', label: 'Club', type: 'text' },

    { name: 'nationality_name', label: 'Nationality', type: 'text' },

    { name: 'player_face_url', label: 'Image URL', type: 'text' },
    { name: 'pace', label: 'Pace', type: 'number' },
    { name: 'shooting', label: 'Shooting', type: 'number' },
    { name: 'defending', label: 'Defending', type: 'number' },
    { name: 'passing', label: 'Passing', type: 'number' },
    { name: 'dribbling', label: 'Dribbling', type: 'number' },
    { name: 'physic', label: 'Physical', type: 'number' },
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private playerService: PlayerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.playerId = +this.route.snapshot.paramMap.get('id')!;
    this.loadPlayerData();
    this.initializeForm();
  }

  initializeForm(): void {
    this.updateForm = this.fb.group({
      long_name: ['', Validators.required],
      player_positions: ['', Validators.required],
      club_name: ['', Validators.required],
      nationality_name: ['', Validators.required],

      player_face_url: ['', Validators.required],
      pace: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      shooting: [
        0,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      defending: [
        0,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      passing: [
        0,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      dribbling: [
        0,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      physic: [
        0,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
    });
  }

  loadPlayerData(): void {
    this.playerService.getPlayerById(this.playerId).subscribe((data) => {
      this.updateForm.patchValue({
        long_name: data.long_name,
        player_positions: data.player_positions,
        club_name: data.club_name,
        overall: data.overall,
        nationality_name: data.nationality_name,
        player_face_url: data.player_face_url,
        pace: data.pace,
        shooting: data.shooting,
        defending: data.defending,
        passing: data.passing,
        dribbling: data.dribbling,
        physic: data.physic,
      });
    });
  }

  updatePlayer(): void {
    if (this.updateForm.valid) {
      this.playerService
        .updatePlayer(this.playerId, this.updateForm.value)
        .subscribe({
          next: (response) => {
            console.log('Player updated:', response);
            this.router.navigate(['/player', this.playerId]);
          },
          error: (err) => {
            console.error('Error updating player:', err);
          },
        });
    }
  }
  navigateToPlayerProfile(): void {
    this.router.navigate(['/player', this.playerId]);
  }
}
