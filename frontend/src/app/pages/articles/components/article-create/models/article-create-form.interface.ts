import { FormControl } from '@angular/forms';
import { SelectOptionItem } from '../../../../../shared/models/select-option-item.interface';

export interface ArticleCreateForm {
  title: FormControl<string>;
  content: FormControl<string>;
  minPrice: FormControl<number | null>;
  maxPrice: FormControl<number | null>;
  category: FormControl<SelectOptionItem | null>;
  photoId: FormControl<number | null>;
}
