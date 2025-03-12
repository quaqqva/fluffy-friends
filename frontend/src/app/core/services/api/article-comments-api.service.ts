import { Injectable } from '@angular/core';
import { EntityApiService } from './entity-api.service';
import { ArticleComment } from '../../models/api/article-comments/article-comment.interface';
import { CreateArticleCommentRequest } from '../../models/api/article-comments/create-article-comment-request.interface';
import { ListResponse } from '../../models/api/list-response.interface';
import { ApiService } from './api.service';
import { ArticleCommentInfoMockup } from '../../mockups/article-comments/article-comment-info.mockup';
import { ArticleCommentsListMockup } from '../../mockups/article-comments/article-comments-list.mockup';

@Injectable({
  providedIn: 'root',
})
export class ArticleCommentsApiService extends EntityApiService<
  ArticleComment,
  CreateArticleCommentRequest
> {
  protected infoMockup: ArticleComment = ArticleCommentInfoMockup.response;

  protected apiUrl = 'articleComments';

  protected listMockup: ListResponse<ArticleComment> =
    ArticleCommentsListMockup.response;

  public constructor(api: ApiService) {
    super(api);
  }
}
