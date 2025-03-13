import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  signal,
  WritableSignal,
} from '@angular/core';
import { ArticleListItem } from '../../../../core/models/api/articles/article-list-item.interface';
import { ArticleCardComponent } from '../article-card/article-card.component';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { ArticleListFiltersComponent } from './article-list-filters/article-list-filters.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { PreloaderComponent } from '../../../../shared/components/preloader/preloader.component';
import { SafeToastService } from '../../../../core/services/safe-toast.service';
import { ArticlesListService } from '../../services/articles-list.service';
import { ArticleViewListFilters } from '../../models/article-view-list-filters.interface';

@Component({
  selector: 'app-articles-list',
  standalone: true,
  imports: [
    ArticleCardComponent,
    FormsModule,
    ArticleListFiltersComponent,
    ButtonComponent,
    PreloaderComponent,
  ],
  templateUrl: './articles-list.component.html',
  styleUrl: './articles-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesListComponent implements OnDestroy {
  public readonly articles: WritableSignal<ArticleListItem[]> = signal([]);

  public readonly isInitialLoading: WritableSignal<boolean> = signal(false);
  public readonly isLoadMoreLoading: WritableSignal<boolean> = signal(false);
  protected readonly faPlus = faPlus;
  private currentFilters?: ArticleViewListFilters;

  public constructor(
    public articlesList: ArticlesListService,
    private toast: SafeToastService,
  ) {
    if (!articlesList.restoredFromSever) {
      this.isInitialLoading.set(true);
      this.articlesList.fetchNextArticles().subscribe({
        next: () => {
          this.isInitialLoading.set(false);
        },
        error: () => {
          this.toast.error('Ошибка загрузки статей');
          this.isInitialLoading.set(false);
        },
      });
    }
  }

  public onFiltersChange(filters: ArticleViewListFilters): void {
    this.currentFilters = filters;
    this.articlesList.resetList();

    this.isInitialLoading.set(true);
    this.articlesList.fetchNextArticles(filters).subscribe({
      next: () => {
        this.isInitialLoading.set(false);
      },
      error: () => {
        this.toast.error('Ошибка загрузки статей');
        this.isInitialLoading.set(false);
      },
    });
  }

  public onClickLoadMore(): void {
    this.isLoadMoreLoading.set(true);
    this.articlesList.fetchNextArticles(this.currentFilters).subscribe({
      next: () => {
        this.isLoadMoreLoading.set(false);
      },
      error: () => {
        this.toast.error('Ошибка загрузки статей');
        this.isLoadMoreLoading.set(false);
      },
    });
  }

  public ngOnDestroy() {
    this.articlesList.resetList();
  }
}
