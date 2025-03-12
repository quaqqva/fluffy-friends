import { FormControl } from '@angular/forms';

export interface ArticleCreateForm {
  title: FormControl<string>;
  content: FormControl<string>;
  minPrice: FormControl<number | null>;
  maxPrice: FormControl<number | null>;
  category: FormControl<number | null>;
  photoId: FormControl<number | null>;
}
