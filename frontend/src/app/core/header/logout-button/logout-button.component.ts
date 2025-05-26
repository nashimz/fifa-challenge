import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logout-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.scss'],
})
export class LogoutButtonComponent {
  isBrowser = typeof window !== 'undefined';
  private auth = this.isBrowser ? inject(AuthService) : null;

  logout() {
    this.auth?.logout({ logoutParams: { returnTo: window.location.origin } });
  }
}
