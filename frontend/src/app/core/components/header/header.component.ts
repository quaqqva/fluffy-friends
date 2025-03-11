import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppRoutes } from '../../models/routing/app-routes.enum';
import { AppRouteSuffixes } from '../../models/routing/app-route-suffixes.enum';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faBookOpen,
  faCat,
  faDog,
  faHippo,
  faHorse,
  faPaw,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { MenubarItem } from '../../../shared/components/menubar/models/menubar-item.interface';
import { MenubarComponent } from '../../../shared/components/menubar/menubar.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, FaIconComponent, MenubarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly items: MenubarItem[] = [
    {
      label: 'Каталог',
      icon: faBookOpen,
      items: [
        {
          label: 'Все',
          routerLink: [AppRoutes.Articles],
          icon: faHorse,
        },
        {
          label: 'Собаки',
          routerLink: [AppRoutes.Articles],
          icon: faDog,
        },
        {
          label: 'Кошки',
          routerLink: [AppRoutes.Articles],
          icon: faCat,
        },
        {
          label: 'Грызуны',
          routerLink: [AppRoutes.Articles],
          icon: faHippo,
        },
      ],
    },
    {
      label: 'Добавить статью',
      icon: faPlus,
      routerLink: [AppRoutes.Articles, AppRouteSuffixes.Create],
    },
  ];

  protected readonly AppRoutes = AppRoutes;
  protected readonly faPaw = faPaw;
}
