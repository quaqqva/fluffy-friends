import { AppRoutes } from '../../core/models/routing/app-routes.enum';
import { RenderMode, ServerRoute } from '@angular/ssr';
import { AppRouteSuffixes } from '../../core/models/routing/app-route-suffixes.enum';

export const articleServerRoutes: ServerRoute[] = [
  {
    path: AppRoutes.Articles,
    renderMode: RenderMode.Server,
  },
  {
    path: `${AppRoutes.Articles}/${AppRouteSuffixes.Create}`,
    renderMode: RenderMode.Client,
  },
  {
    path: `${AppRoutes.Articles}/:id`,
    renderMode: RenderMode.Server,
  },
];
