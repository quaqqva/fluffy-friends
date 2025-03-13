import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { ArticleCommentCreateForm } from './models/article-comment-create-form.interface';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../../../../shared/components/button/button.component';
import { ButtonTypes } from '../../../../../shared/components/button/models/button-types.enum';
import { TextareaComponent } from '../../../../../shared/components/textarea/textarea.component';
import { InputComponent } from '../../../../../shared/components/input/input.component';
import { CreateArticleCommentRequest } from '../../../../../core/models/api/article-comments/create-article-comment-request.interface';
import { ArticleCommentsApiService } from '../../../../../core/services/api/article-comments-api.service';
import { ArticleComment } from '../../../../../core/models/api/article-comments/article-comment.interface';
import { PreloaderComponent } from '../../../../../shared/components/preloader/preloader.component';
import { SafeToastService } from '../../../../../core/services/safe-toast.service';

@Component({
  selector: 'app-article-comment-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    TextareaComponent,
    InputComponent,
    PreloaderComponent,
  ],
  templateUrl: './article-comment-create.component.html',
  styleUrl: './article-comment-create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleCommentCreateComponent {
  @Input({ required: true }) articleId!: number;
  @Output() created: EventEmitter<ArticleComment> =
    new EventEmitter<ArticleComment>();

  public form: FormGroup<ArticleCommentCreateForm>;
  public readonly isLoading: WritableSignal<boolean> = signal(false);

  protected readonly ButtonTypes = ButtonTypes;

  public constructor(
    fb: FormBuilder,
    private articleCommentsApi: ArticleCommentsApiService,
    private toast: SafeToastService,
  ) {
    this.form = fb.nonNullable.group({
      author: ['', [Validators.required]],
      content: ['', [Validators.required]],
    });
  }

  public get authorControl(): FormControl {
    return this.form.controls.author;
  }

  public get contentControl(): FormControl {
    return this.form.controls.content;
  }

  private get serializedForm(): CreateArticleCommentRequest {
    return {
      author: this.authorControl.value,
      content: this.contentControl.value,
      articleId: this.articleId,
    };
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const requestBody = this.serializedForm;

    this.isLoading.set(true);
    this.articleCommentsApi.create(requestBody).subscribe({
      next: (response) => {
        this.form.reset();
        this.isLoading.set(false);
        this.created.emit({
          ...requestBody,
          ...response,
          createdAt: Date.now().toString(),
        });
      },
      error: () => {
        this.toast.error('Ошибка при публикации комментария');
        this.isLoading.set(false);
      },
    });
  }
}
