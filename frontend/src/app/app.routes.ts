import { Routes } from '@angular/router';
import { LandingPageComponent } from './views/landing-page/landing-page.component';
import { PlayersComponent } from './views/players/players.component';
import { PlayerProfileComponent } from './views/player-profile/player-profile.component';
import { UpdatePlayerComponent } from './views/update-player/update-player.component';
import { AddPlayerComponent } from './views/add-player/add-player.component';
import { BrowserAuthGuard } from './core/guards/browser-auth.guard';
import { NotAuthorizedComponent } from './views/not-authorized/not-authorized.component';

export const routes: Routes = [
  {
    path: 'home',
    component: LandingPageComponent,
  },
  {
    path: 'players',
    component: PlayersComponent,
    canActivate: [BrowserAuthGuard], // protect players route
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'player/:id',
    component: PlayerProfileComponent,
    canActivate: [BrowserAuthGuard],
  },
  {
    path: 'player/update/:id',
    component: UpdatePlayerComponent,
    canActivate: [BrowserAuthGuard], // protect update player route
  },
  {
    path: 'add-player',
    component: AddPlayerComponent,
    canActivate: [BrowserAuthGuard], // protect add player route
  },
  { path: 'not-authorized', component: NotAuthorizedComponent },
];
