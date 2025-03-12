import { ChangeDetectionStrategy, Component } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ArticleListFiltersForm } from './models/article-list-filters-form.interface';
import { InputComponent } from '../../../../../shared/components/input/input.component';
import { AutoComplete } from 'primeng/autocomplete';
import { InputAutocompleteComponent } from '../../../../../shared/components/input-autocomplete/input-autocomplete.component';
import { InputMasks } from '../../../../../shared/components/input/models/input-masks.enum';

@Component({
  selector: 'app-article-list-filters',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputComponent,
    AutoComplete,
    InputAutocompleteComponent,
  ],
  templateUrl: './article-list-filters.component.html',
  styleUrl: './article-list-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleListFiltersComponent {
  public form: FormGroup<ArticleListFiltersForm>;

  protected readonly faSearch = faSearch;
  protected readonly InputMasks = InputMasks;

  public constructor(fb: FormBuilder) {
    this.form = fb.group({
      title: '',
      minPrice: null as number | null,
      maxPrice: null as number | null,
      categories: [] as number[] | null,
      categoriesText: '',
    });
  }

  public get titleControl(): FormControl {
    return this.form.controls.title;
  }

  public get categoriesTextControl(): FormControl {
    return this.form.controls.categoriesText;
  }

  public get minPriceControl(): FormControl {
    return this.form.controls.minPrice;
  }

  public get maxPriceControl(): FormControl {
    return this.form.controls.maxPrice;
  }
}
