import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ArticleListItem } from '../../core/models/api/articles/article-list-item.interface';
import { ArticleCardComponent } from '../articles/components/article-card/article-card.component';
import { Carousel } from 'primeng/carousel';
import { ButtonComponent } from '../../shared/components/button/button.component';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { ArticlesListMockup } from '../../core/mockups/articles/articles-list.mockup';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgOptimizedImage, ArticleCardComponent, Carousel, ButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  public articles: ArticleListItem[] = ArticlesListMockup.list.items;

  protected readonly faChevronLeft = faChevronLeft;
  protected readonly faChevronRight = faChevronRight;
}
