import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './core/header/header.component';

import { FormsModule } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HeaderComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'fifaChallenge';
  private platformId = inject(PLATFORM_ID);
  private auth: AuthService | null = null;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Only inject and use AuthService on the browser
      this.auth = inject(AuthService);
      this.auth.getAccessTokenSilently().subscribe({
        next: (token) => console.log('Access Token:', token),
        error: (err) => console.error('Token error:', err),
      });
      this.auth.isAuthenticated$.subscribe((isAuth) => {
        console.log('✅ Authenticated:', isAuth);
      });
    }
  }
}
