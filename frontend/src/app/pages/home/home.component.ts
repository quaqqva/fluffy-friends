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

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgOptimizedImage, ArticleCardComponent, Carousel, ButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  public articles: ArticleListItem[] = [
    {
      id: 1,
      title: 'Заголовок статьи 1',
      minPrice: 100,
      maxPrice: 200,
      views: 0,
      comments: 1000,
      photoUrl:
        'https://lapkins.ru/upload/iblock/6ed/6edfe6c7452a5a6357233c57c78957c0.jpg',
      category: 'Категория 1',
      publishedAt: new Date().toISOString(),
    },
    {
      id: 1,
      title: 'Заголовок статьи 1',
      minPrice: 100,
      maxPrice: 200,
      views: 0,
      comments: 1000,
      photoUrl:
        'https://lapkins.ru/upload/iblock/6ed/6edfe6c7452a5a6357233c57c78957c0.jpg',
      category: 'Категория 1',
      publishedAt: new Date().toISOString(),
    },
    {
      id: 1,
      title: 'Заголовок статьи 1',
      minPrice: 100,
      maxPrice: 200,
      views: 0,
      comments: 1000,
      photoUrl:
        'https://lapkins.ru/upload/resize_cache/uf/c49/293_293_2/c494dcd9f41c298552725e5a58b71b7f.jpg',
      category: 'Категория 1',
      publishedAt: new Date().toISOString(),
    },
    {
      id: 1,
      title: 'Заголовок статьи 1',
      minPrice: 100,
      maxPrice: 200,
      views: 0,
      comments: 1000,
      photoUrl:
        'https://lapkins.ru/upload/iblock/6ed/6edfe6c7452a5a6357233c57c78957c0.jpg',
      category: 'Категория 1',
      publishedAt: new Date().toISOString(),
    },
  ];
  protected readonly faChevronLeft = faChevronLeft;
  protected readonly faChevronRight = faChevronRight;
}
