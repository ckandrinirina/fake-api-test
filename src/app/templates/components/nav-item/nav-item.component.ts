import { Component } from '@angular/core';

interface Menu {
  name: string;
  link: string[];
  icon: string;
}

@Component({
  selector: 'app-nav-item',
  standalone: false,
  templateUrl: './nav-item.component.html',
  styleUrl: './nav-item.component.scss',
})
export class NavItemComponent {
  menus: Menu[] = [
    {
      name: 'Tableau de bord',
      link: ['/dashboard'],
      icon: 'dashboard',
    },
    {
      name: 'Produits',
      link: ['/products'],
      icon: 'receipt-long',
    },
  ];
}
