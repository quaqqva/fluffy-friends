export interface CreateArticleRequest {
  title: string;
  content: string;
  minPrice: number;
  maxPrice: number;
  category: number;
  photoId: number;
}
