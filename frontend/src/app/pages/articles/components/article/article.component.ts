import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Article } from '../../../../core/models/api/articles/article.interface';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { ArticleCommentCreateComponent } from './article-comment-create/article-comment-create.component';
import { ArticleCommentComponent } from './article-comment/article-comment.component';
import { SafeHtmlPipe } from 'primeng/menu';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ArticleCommentCreateComponent,
    ArticleCommentComponent,
    DatePipe,
    SafeHtmlPipe,
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleComponent {
  public article!: Article;
}
