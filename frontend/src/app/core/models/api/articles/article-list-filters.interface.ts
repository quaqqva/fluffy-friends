import { ListFilters } from '../list-filters.interface';

export interface ArticleListFilters extends ListFilters {
  title?: string;
  minPrice?: number;
  maxPrice?: number;
  categories?: number[];
}
