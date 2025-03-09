import { AppRouteSuffixes } from '../../core/models/routing/app-route-suffixes.enum';
import { Routes } from '@angular/router';

export const articleRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./components/articles-list/articles-list.component').then(
        (m) => m.ArticlesListComponent,
      ),
  },
  {
    path: AppRouteSuffixes.Create,
    loadComponent: () =>
      import('./components/article-create/article-create.component').then(
        (m) => m.ArticleCreateComponent,
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./components/article/article.component').then(
        (m) => m.ArticleComponent,
      ),
  },
];
