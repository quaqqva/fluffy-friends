import {
  ChangeDetectionStrategy,
  Component,
  signal,
  WritableSignal,
} from '@angular/core';
import { InputComponent } from '../../../../shared/components/input/input.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ArticleCreateForm } from './models/article-create-form.interface';
import { InputMasks } from '../../../../shared/components/input/models/input-masks.enum';
import { SelectComponent } from '../../../../shared/components/select/select.component';
import { TextEditorComponent } from '../../../../shared/components/text-editor/text-editor.component';
import { DropzoneComponent } from '../../../../shared/components/dropzone/dropzone.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ArticlesApiService } from '../../../../core/services/api/articles-api.service';
import { ArticleCategoriesApiService } from '../../../../core/services/api/article-categories-api.service';
import { SelectOptionItem } from '../../../../shared/models/select-option-item.interface';
import { PreloaderComponent } from '../../../../shared/components/preloader/preloader.component';
import { ButtonTypes } from '../../../../shared/components/button/models/button-types.enum';
import { CreateArticleRequest } from '../../../../core/models/api/articles/create-article-request.interface';
import { Router } from '@angular/router';
import { AppRoutes } from '../../../../core/models/routing/app-routes.enum';
import { SafeToastService } from '../../../../core/services/safe-toast.service';

@Component({
  selector: 'app-article-create',
  standalone: true,
  imports: [
    InputComponent,
    SelectComponent,
    TextEditorComponent,
    DropzoneComponent,
    ButtonComponent,
    PreloaderComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './article-create.component.html',
  styleUrl: './article-create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleCreateComponent {
  public form: FormGroup<ArticleCreateForm>;

  public readonly categoryOptions: WritableSignal<SelectOptionItem[]> = signal(
    [],
  );
  public readonly isLoading: WritableSignal<boolean> = signal(false);

  protected readonly InputMasks = InputMasks;
  protected readonly faPlus = faPlus;
  protected readonly ButtonTypes = ButtonTypes;

  public constructor(
    fb: FormBuilder,
    private articlesApi: ArticlesApiService,
    private articleCategoriesApi: ArticleCategoriesApiService,
    private toast: SafeToastService,
    private router: Router,
  ) {
    this.form = fb.group({
      title: fb.nonNullable.control('', [Validators.required]),
      minPrice: null as number | null,
      maxPrice: null as number | null,
      category: [null as SelectOptionItem | null, [Validators.required]],
      content: fb.nonNullable.control('', [Validators.required]),
      photoId: [null as number | null, [Validators.required]],
    });

    this.fetchCategories();
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

  public get categoryControl(): FormControl {
    return this.form.controls.category;
  }

  public get contentControl(): FormControl {
    return this.form.controls.content;
  }

  public get photoIdControl(): FormControl {
    return this.form.controls.photoId;
  }

  private get serializedForm(): CreateArticleRequest {
    return {
      title: this.titleControl.value,
      minPrice: Number(this.minPriceControl.value) || null,
      maxPrice: Number(this.maxPriceControl.value) || null,
      category: this.categoryControl.value.id,
      content: this.contentControl.value,
      photoId: this.photoIdControl.value,
    };
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.articlesApi.create(this.serializedForm).subscribe({
      next: () => {
        this.router.navigate(['/', AppRoutes.Articles]);
      },
      error: () => {
        this.toast.error('Ошибка при публикации статьи');
        this.isLoading.set(false);
      },
    });
  }

  private fetchCategories(): void {
    this.isLoading.set(true);
    this.articleCategoriesApi.getList({ limit: 100, offset: 0 }).subscribe({
      next: (response) => {
        this.categoryOptions.set(response.items);
        this.isLoading.set(false);
      },
      error: () => {
        this.toast.error('Ошибка загрузки категорий статей');
      },
    });
  }
}
