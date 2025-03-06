import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppRoutes } from '../../models/routing/app-routes.enum';
import { AppRouteSuffixes } from '../../models/routing/app-route-suffixes.enums';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  protected readonly AppRoutes = AppRoutes;
  protected readonly AppRouteSuffixes = AppRouteSuffixes;
}
