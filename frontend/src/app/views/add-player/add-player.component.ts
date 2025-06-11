import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { PlayerService } from '../../../app/core/services/player.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-player',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss'],
})
export class AddPlayerComponent {
  addForm!: FormGroup;
  fieldLabels: { [key: string]: string } = {
    long_name: 'Name',
    player_positions: 'Position',
    club_name: 'Club Name',
    nationality_name: 'Nationality',
    overall: 'Overall',
    skill_moves: 'Skill Moves',
    player_face_url: 'Image URL',
    pace: 'Pace',
    shooting: 'Shooting',
    defending: 'Defending',
    passing: 'Passing',
    dribbling: 'Dribbling',
    physic: 'Physical',
  };

  formFields = [
    'long_name',
    'player_positions',
    'club_name',
    'nationality_name',
    'overall',
    'skill_moves',
    'player_face_url',
    'pace',
    'shooting',
    'defending',
    'passing',
    'dribbling',
    'physic',
  ];

  constructor(
    private fb: FormBuilder,
    private playerService: PlayerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.addForm = this.fb.group({
      long_name: ['', [Validators.required, Validators.minLength(2)]],
      player_positions: ['', [Validators.required]],
      club_name: ['', [Validators.required]],
      overall: ['', [Validators.required]],
      nationality_name: ['', [Validators.required]],
      skill_moves: ['', [Validators.required]],
      player_face_url: [
        '',
        [Validators.required, Validators.pattern('https?://.+')],
      ],
      pace: ['', [Validators.required]],
      shooting: ['', [Validators.required]],
      passing: ['', [Validators.required]],
      dribbling: ['', [Validators.required]],
      defending: ['', [Validators.required]],
      physic: ['', [Validators.required]],
    });
  }

  addPlayer() {
    if (this.addForm.valid) {
      this.playerService.addPlayer(this.addForm.value).subscribe(
        (response) => {
          const newPlayerId = response?.player?.id;
          if (newPlayerId) {
            this.router.navigate(['/player', newPlayerId]);
          } else {
            console.warn('Player added but ID was not found in response.');
            alert('Player added, but could not navigate to profile.');
          }
        },
        (error: any) => {
          console.error('Error adding player', error);
          alert(
            'An error occurred while adding the player. Please try again later.'
          );
        }
      );
    } else {
      alert('Please fill out all required fields correctly.');
    }
  }
}
