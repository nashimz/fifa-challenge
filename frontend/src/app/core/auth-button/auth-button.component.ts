import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule, AsyncPipe, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-button',
  standalone: true,
  imports: [CommonModule, AsyncPipe, NgIf],
  templateUrl: './auth-button.component.html',
  styleUrls: ['./auth-button.component.scss'],
})
export class AuthButtonComponent {
  isBrowser = typeof window !== 'undefined';
  auth = this.isBrowser ? inject(AuthService) : null;
  private router = inject(Router);

  login() {
    this.auth?.loginWithRedirect();
  }

  signup() {
    this.auth?.loginWithRedirect({
      authorizationParams: {
        screen_hint: 'signup',
      },
    });
  }

  logout() {
    this.auth?.logout({ logoutParams: { returnTo: window.location.origin } });
  }
  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
