import { Routes } from '@angular/router';
import { AppRoutes } from './core/models/routing/app-routes.enum';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: AppRoutes.Home,
  },
  {
    path: AppRoutes.Home,
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: AppRoutes.Articles,
    loadChildren: () =>
      import('./pages/articles/article.routes').then((m) => m.articleRoutes),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        (m) => m.NotFoundComponent,
      ),
  },
];
