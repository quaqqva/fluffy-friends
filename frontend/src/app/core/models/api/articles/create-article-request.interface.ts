export interface CreateArticleRequest {
  title: string;
  content: string;
  minPrice: number | null;
  maxPrice: number | null;
  category: number;
  photoId: number;
}
