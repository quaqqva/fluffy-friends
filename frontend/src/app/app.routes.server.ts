import { RenderMode, ServerRoute } from '@angular/ssr';
import { AppRoutes } from './core/models/routing/app-routes.enum';
import { articleServerRoutes } from './pages/articles/article.routes.server';

export const serverRoutes: ServerRoute[] = [
  {
    path: AppRoutes.Home,
    renderMode: RenderMode.Server,
  },
  ...articleServerRoutes,
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
