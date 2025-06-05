import { Component, Input, OnInit } from '@angular/core';
import { Players } from '../model/players';
import { CommonModule, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-player-card',
  standalone: true,
  imports: [CommonModule, NgFor, RouterLink],
  templateUrl: './player-card.component.html',
  styleUrl: './player-card.component.scss',
})
export class PlayerCardComponent {
  @Input() Players?: Players[];
}
