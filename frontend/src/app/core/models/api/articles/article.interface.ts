import { ArticleComment } from '../article-comments/article-comment.interface';

export interface Article {
  id: number;
  title: string;
  content: string;
  minPrice: number;
  maxPrice: number;
  views: number;
  category: string;
  photoUrl: string;
  publishedAt: string;
  comments: ArticleComment[];
}
