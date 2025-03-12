import { Injectable } from '@angular/core';
import { EntityApiService } from './entity-api.service';
import { Article } from '../../models/api/articles/article.interface';
import { ArticleListItem } from '../../models/api/articles/article-list-item.interface';
import { ArticleListFilters } from '../../models/api/articles/article-list-filters.interface';
import { ApiService } from './api.service';
import { ListResponse } from '../../models/api/list-response.interface';
import { CreateArticleRequest } from '../../models/api/articles/create-article-request.interface';

@Injectable({
  providedIn: 'root',
})
export class ArticlesApiService extends EntityApiService<
  Article,
  CreateArticleRequest,
  ArticleListFilters,
  ArticleListItem
> {
  protected listMockup: ListResponse<ArticleListItem> = { count: 0, items: [] };

  protected infoMockup: Article = {
    id: 0,
    title: '',
    content: '',
    minPrice: 0,
    maxPrice: 0,
    photoUrl: '',
    category: '',
    comments: [],
  };

  protected apiUrl = 'articles';

  public constructor(api: ApiService) {
    super(api);
  }
}
