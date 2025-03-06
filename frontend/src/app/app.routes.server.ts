import { RenderMode, ServerRoute } from '@angular/ssr';
import { AppRoutes } from './core/models/routing/app-routes.enum';
import { AppRouteSuffixes } from './core/models/routing/app-route-suffixes.enums';

export const serverRoutes: ServerRoute[] = [
  {
    path: AppRoutes.Home,
    renderMode: RenderMode.Server,
  },
  {
    path: `${AppRoutes.Articles}/${AppRouteSuffixes.Create}`,
    renderMode: RenderMode.Client,
  },
  {
    path: AppRoutes.Articles,
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
