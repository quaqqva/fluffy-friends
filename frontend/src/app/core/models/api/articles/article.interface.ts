import { ArticleComment } from '../article-comments/article-comment.interface';

export interface Article {
  id: number;
  title: string;
  content: string;
  minPrice: number;
  maxPrice: number;
  category: string;
  photoUrl: string;
  comments: ArticleComment[];
}
