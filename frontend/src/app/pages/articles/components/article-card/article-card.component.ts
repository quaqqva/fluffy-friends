import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppRoutes } from '../../../../core/models/routing/app-routes.enum';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faComment, faEye } from '@fortawesome/free-solid-svg-icons';
import { ArticleListItem } from '../../../../core/models/api/articles/article-list-item.interface';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { Chip } from 'primeng/chip';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [RouterLink, FaIconComponent, DatePipe, NgOptimizedImage, Chip],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleCardComponent {
  @Input({ required: true }) article!: ArticleListItem;

  protected readonly AppRoutes = AppRoutes;
  protected readonly faComment = faComment;
  protected readonly faEye = faEye;
}
