import { Component, OnInit, Inject } from '@angular/core';

import { MenuItem } from '../model/menu-items';
import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HeaderMenuComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  menuItems: MenuItem[] = [
    {
      text: 'Home',
      route: '/home',
    },
    {
      text: 'Players',
      route: '/players',
    },
    {
      text: 'Contact',
      route: '/contact',
    },
    {
      text: 'Dashboard',
      route: '/dashboard',
    },
  ];
}
