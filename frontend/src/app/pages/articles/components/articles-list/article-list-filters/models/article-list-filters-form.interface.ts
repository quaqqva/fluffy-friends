import { FormControl } from '@angular/forms';

export interface ArticleListFiltersForm {
  title: FormControl<string | null>;
  minPrice: FormControl<number | null>;
  maxPrice: FormControl<number | null>;
  categories: FormControl<number[] | null>;
  categoriesText: FormControl<string | null>;
}
