import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-article-create',
  imports: [],
  templateUrl: './article-create.component.html',
  styleUrl: './article-create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleCreateComponent {}
