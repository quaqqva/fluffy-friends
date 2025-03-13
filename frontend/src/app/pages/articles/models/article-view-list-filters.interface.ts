import { ArticleListFilters } from '../../../core/models/api/articles/article-list-filters.interface';

export interface ArticleViewListFilters
  extends Pick<
    ArticleListFilters,
    'categories' | 'title' | 'maxPrice' | 'minPrice'
  > {}
