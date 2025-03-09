import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppRoutes } from '../../models/routing/app-routes.enum';
import { AppRouteSuffixes } from '../../models/routing/app-route-suffixes.enum';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, Menubar, FaIconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly items: MenuItem[] = [
    {
      label: 'Каталог',
      items: [
        {
          label: 'Все',
          routerLink: [AppRoutes.Articles],
        },
        {
          label: 'Собаки',
          routerLink: [AppRoutes.Articles],
        },
        {
          label: 'Кошки',
          routerLink: [AppRoutes.Articles],
        },
        {
          label: 'Грызуны',
          routerLink: [AppRoutes.Articles],
        },
      ],
    },
    {
      label: 'Добавить статью',
      routerLink: [AppRoutes.Articles, AppRouteSuffixes.Create],
    },
  ];

  protected readonly AppRoutes = AppRoutes;
}
