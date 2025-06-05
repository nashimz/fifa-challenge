import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItem } from '../../model/menu-items';
import { AuthService } from '@auth0/auth0-angular';
import { LoginButtonComponent } from '../login-button/login-button.component';
import { LogoutButtonComponent } from '../logout-button/logout-button.component';

@Component({
  selector: 'app-header-menu',
  standalone: true,
  imports: [
    CommonModule,
    NgFor,
    NgIf,
    RouterLink,
    LoginButtonComponent,
    LogoutButtonComponent,
  ],
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
})
export class HeaderMenuComponent {
  @Input() menuItems?: MenuItem[];
}
