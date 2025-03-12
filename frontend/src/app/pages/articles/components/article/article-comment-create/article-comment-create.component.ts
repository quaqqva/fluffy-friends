import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ArticleCommentCreateForm } from './models/article-comment-create-form.interface';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonComponent } from '../../../../../shared/components/button/button.component';
import { ButtonTypes } from '../../../../../shared/components/button/models/button-types.enum';
import { TextareaComponent } from '../../../../../shared/components/textarea/textarea.component';
import { InputComponent } from '../../../../../shared/components/input/input.component';
import { FloatLabelVariants } from '../../../../../shared/models/float-label-variants.enum';

@Component({
  selector: 'app-article-comment-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    TextareaComponent,
    InputComponent,
  ],
  templateUrl: './article-comment-create.component.html',
  styleUrl: './article-comment-create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleCommentCreateComponent {
  public form: FormGroup<ArticleCommentCreateForm>;
  protected readonly ButtonTypes = ButtonTypes;
  protected readonly FloatLabelVariants = FloatLabelVariants;

  public constructor(fb: FormBuilder) {
    this.form = fb.nonNullable.group({
      author: '',
      content: '',
    });
  }

  public get authorControl(): FormControl {
    return this.form.controls.author;
  }

  public get contentControl(): FormControl {
    return this.form.controls.content;
  }
}
