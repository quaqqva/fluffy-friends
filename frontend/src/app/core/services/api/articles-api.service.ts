import { Injectable } from '@angular/core';
import { EntityApiService } from './entity-api.service';
import { Article } from '../../models/api/articles/article.interface';
import { ArticleListItem } from '../../models/api/articles/article-list-item.interface';
import { ArticleListFilters } from '../../models/api/articles/article-list-filters.interface';
import { ApiService } from './api.service';
import { ListResponse } from '../../models/api/list-response.interface';
import { CreateArticleRequest } from '../../models/api/articles/create-article-request.interface';
import { ArticlesListMockup } from '../../mockups/articles/articles-list.mockup';
import { ArticleInfoMockup } from '../../mockups/articles/article-info.mockup';

@Injectable({
  providedIn: 'root',
})
export class ArticlesApiService extends EntityApiService<
  Article,
  CreateArticleRequest,
  ArticleListFilters,
  ArticleListItem
> {
  protected listMockup: ListResponse<ArticleListItem> =
    ArticlesListMockup.response;

  protected infoMockup: Article = ArticleInfoMockup.response;

  protected apiUrl = 'articles';

  public constructor(api: ApiService) {
    super(api);
  }
}
