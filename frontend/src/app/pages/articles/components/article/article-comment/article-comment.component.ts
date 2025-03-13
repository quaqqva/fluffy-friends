import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ArticleComment } from '../../../../../core/models/api/article-comments/article-comment.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-article-comment',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './article-comment.component.html',
  styleUrl: './article-comment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleCommentComponent {
  @Input({ required: true }) comment!: ArticleComment;
}
