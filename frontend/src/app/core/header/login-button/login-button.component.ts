import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login-button.component.html',
  styleUrl: './login-button.component.scss',
})
export class LoginButtonComponent {
  isBrowser = typeof window !== 'undefined';
  private auth = this.isBrowser ? inject(AuthService) : null;

  isAuthenticated$ = this.auth?.isAuthenticated$;
  user$ = this.auth?.user$;

  login() {
    this.auth?.loginWithRedirect();
  }
}
