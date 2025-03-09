import { Injectable } from '@angular/core';
import { EntityApiService } from './entity-api.service';
import { ArticleComment } from '../../models/api/article-comments/article-comment.interface';
import { CreateArticleCommentRequest } from '../../models/api/article-comments/create-article-comment-request.interface';
import { ListResponse } from '../../models/api/list-response.interface';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ArticleCommentsApiService extends EntityApiService<
  ArticleComment,
  CreateArticleCommentRequest
> {
  protected infoMockup: ArticleComment = {
    id: 0,
    createdAt: '',
    author: '',
    articleId: 0,
    content: '',
  };

  protected apiUrl = 'articleComments';

  protected listMockup: ListResponse<ArticleComment> = { count: 0, items: [] };

  public constructor(api: ApiService) {
    super(api);
  }
}
