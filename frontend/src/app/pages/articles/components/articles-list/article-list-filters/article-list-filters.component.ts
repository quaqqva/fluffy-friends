import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
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
import { ArticleViewListFilters } from '../../../models/article-view-list-filters.interface';
import { ArticleCategoriesApiService } from '../../../../../core/services/api/article-categories-api.service';
import { SelectOptionItem } from '../../../../../shared/models/select-option-item.interface';
import { debounceTime, distinctUntilChanged } from 'rxjs';

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
  @Output() filtersChanged = new EventEmitter<ArticleViewListFilters>();

  public form: FormGroup<ArticleListFiltersForm>;

  public readonly categoryOptions: WritableSignal<SelectOptionItem[]> = signal(
    [],
  );

  protected readonly faSearch = faSearch;
  protected readonly InputMasks = InputMasks;

  public constructor(
    fb: FormBuilder,
    private articleCategoriesApi: ArticleCategoriesApiService,
  ) {
    this.form = fb.group({
      title: '',
      minPrice: null as number | null,
      maxPrice: null as number | null,
      categories: [] as number[] | null,
    });

    this.initFormSubmitHandlers();
  }

  public get titleControl(): FormControl {
    return this.form.controls.title;
  }

  public get minPriceControl(): FormControl {
    return this.form.controls.minPrice;
  }

  public get maxPriceControl(): FormControl {
    return this.form.controls.maxPrice;
  }

  public get categoriesControl(): FormControl {
    return this.form.controls.categories;
  }

  private get serializedForm(): ArticleViewListFilters {
    let result: ArticleViewListFilters = {
      title: this.titleControl.value,
      categories:
        this.categoriesControl.value?.map(
          (item: SelectOptionItem) => item.id,
        ) || [],
    };

    if (this.minPriceControl.value)
      result = { ...result, minPrice: Number(this.minPriceControl.value) };
    if (this.maxPriceControl.value)
      result = { ...result, maxPrice: Number(this.maxPriceControl.value) };

    return result;
  }

  public onCategorySearch(query: string): void {
    this.articleCategoriesApi
      .getList({
        name: query,
        limit: 100,
      })
      .subscribe((response) => {
        this.categoryOptions.set(response.items);
      });
  }

  private initFormSubmitHandlers(): void {
    Object.values(this.form.controls).forEach((control) => {
      const pipe =
        control === this.categoriesControl
          ? control.valueChanges
          : control.valueChanges.pipe(
              debounceTime(300),
              distinctUntilChanged(),
            );
      pipe.subscribe(() => {
        this.filtersChanged.emit(this.serializedForm);
      });
    });
  }
}
