import { Routes } from '@angular/router';
import { LandingPageComponent } from './views/landing-page/landing-page.component';
import { PlayersComponent } from './views/players/players.component';
import { PlayerProfileComponent } from './views/player-profile/player-profile.component';
import { UpdatePlayerComponent } from './views/update-player/update-player.component';
import { AddPlayerComponent } from './views/add-player/add-player.component';
import { BrowserAuthGuard } from './middlewares/guards/browser-auth.guard';
import { NotAuthorizedComponent } from './views/not-authorized/not-authorized.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: 'home',
    component: LandingPageComponent,
  },
  {
    path: 'players',
    component: PlayersComponent,
    canActivate: [BrowserAuthGuard],
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
    canActivate: [BrowserAuthGuard],
  },
  {
    path: 'add-player',
    component: AddPlayerComponent,
    canActivate: [BrowserAuthGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [BrowserAuthGuard],
  },
  { path: 'not-authorized', component: NotAuthorizedComponent },
];
