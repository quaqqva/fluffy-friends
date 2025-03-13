import { FormControl } from '@angular/forms';

export interface ArticleCommentCreateForm {
  author: FormControl<string>;
  content: FormControl<string>;
}
