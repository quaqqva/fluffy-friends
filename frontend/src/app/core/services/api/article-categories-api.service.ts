import { Injectable } from '@angular/core';
import { EntityApiService } from './entity-api.service';
import { ListResponse } from '../../models/api/list-response.interface';
import { ApiService } from './api.service';
import { ArticleCategory } from '../../models/api/article-categories/article-category.interface';
import { ArticleCategoryListFilters } from '../../models/api/article-categories/article-category-list-filters.interface';
import { CreateArticleCategoryRequest } from '../../models/api/article-categories/create-article-category-request.interface';

@Injectable({
  providedIn: 'root',
})
export class ArticleCategoriesApiService extends EntityApiService<
  ArticleCategory,
  CreateArticleCategoryRequest,
  ArticleCategoryListFilters
> {
  protected listMockup: ListResponse<ArticleCategory> = { count: 0, items: [] };

  protected infoMockup: ArticleCategory = {
    id: 0,
    name: '',
  };

  protected apiUrl = 'articleCategories';

  public constructor(api: ApiService) {
    super(api);
  }
}
