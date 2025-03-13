import { Article } from './article.interface';

export interface ArticleListItem
  extends Pick<
    Article,
    | 'id'
    | 'title'
    | 'category'
    | 'photoUrl'
    | 'minPrice'
    | 'maxPrice'
    | 'publishedAt'
    | 'views'
  > {
  comments: number;
}
