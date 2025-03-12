import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ArticleCreateForm } from './models/article-create-form.interface';
import { InputMasks } from '../../../../shared/components/input/models/input-masks.enum';
import { SelectComponent } from '../../../../shared/components/select/select.component';
import { TextEditorComponent } from '../../../../shared/components/text-editor/text-editor.component';
import { DropzoneComponent } from '../../../../shared/components/dropzone/dropzone.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-article-create',
  standalone: true,
  imports: [
    InputComponent,
    SelectComponent,
    TextEditorComponent,
    DropzoneComponent,
    ButtonComponent,
  ],
  templateUrl: './article-create.component.html',
  styleUrl: './article-create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleCreateComponent {
  public form: FormGroup<ArticleCreateForm>;
  protected readonly InputMasks = InputMasks;
  protected readonly faPlus = faPlus;

  public constructor(fb: FormBuilder) {
    this.form = fb.group({
      title: fb.nonNullable.control(''),
      minPrice: null as number | null,
      maxPrice: null as number | null,
      category: null as number | null,
      content: fb.nonNullable.control(''),
      photoId: null as number | null,
    });
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
}
